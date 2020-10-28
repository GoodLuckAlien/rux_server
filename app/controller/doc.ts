import { Controller } from 'egg';
import * as marked from 'marked';

import { filterHTMLTag } from '../utils/index';
import { get, post, put, Delete } from '../decorator/router';
import { DOC_ID_MAP_TAG_ID } from '../utils/redis';

/**
 * @Controller 管理端->文档管理
 */
export default class Doc extends Controller {

  /**
   * 向标签列表加入文档
   * @param id 文档 id
   * @param payload 参数
   */
  private async docToTagList(id, payload) {
    const { service, app } = this;
    if (payload.tagList && id) {
      const tagList = JSON.parse(payload.tagList);
      const currentTag = tagList[0];
      const currentTagId = currentTag * 1;
      await app.redis.set(DOC_ID_MAP_TAG_ID + String(id), currentTagId);
      // app.redis.set
      const res: any = await service.tag.getTagById(currentTagId);
      if (res) {
        const docArr = JSON.parse(res.dataValues.docArr);
        docArr.push(id);
        await service.tag.update(currentTagId, {
          docArr: JSON.stringify(docArr),
        });
      }
    }
  }
  /**
   *
   * @param id 文档ID
   * @param tagId 标签ID
   */
  private async deleteDocFromTagList(id, tagId) {
    const { service } = this;
    const currentTag: any = await service.tag.getTagById(tagId);
    if (currentTag) {
      const { docArr } = currentTag.dataValues;
      const arr = JSON.parse(docArr);
      const index = arr.findIndex(i => i === id);
      if (index >= 0) {
        arr.splice(index, 1);
        service.tag.update(tagId,
          {
            docArr: JSON.stringify(arr),
          });
      }
    }
  }
  /**
   * @summary 获取文章指南列表
   * @description 获取配置菜单列表
   * @router get /doc/menu/list
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/doc/menu/list')
  public async getList() {
    const { ctx, service } = this;
    const result = await service.menus.getList(1);
    ctx.helper.success({ ctx, data: result, message: '请求成功！' });
  }
  /**
   * @summary 创建文挡
   * @description 获取配置菜单列表
   * @router post /api/create/doc
   * @request body createDocRequest  *body
   * @response 200 baseResponse 创建成功
   */
  @post('/api/create/doc')
  public async createDoc() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createDocRequest, ctx.request.body);
    const payload = Object.assign({}, ctx.request.body, { uid: ctx.__id });
    const res: any = await service.doc.create(payload);
    if (res) {
      ctx.helper.success({ ctx, data: null, message: '创建成功' });
      this.docToTagList(res.dataValues.id, payload);
    } else {
      ctx.helper.fail({ ctx, data: null, message: '创建失败' });
    }
  }
  /**
   * @summary 获取api文档
   * @description 获取api文档
   * @router get /doc/get/api
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/doc/get/api')
  public async getDocApi() {
    const { ctx, service } = this;
    const res = await service.doc.getApiContent({ uid: 1, type: 'api' });
    if (res) {
      ctx.helper.success({ ctx, data: res, message: '创建成功' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '没有数据' });
    }
  }
  /**
   * @summary 获取文档详情
   * @description 获取文档详情
   * @router get /doc/get/detail
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/doc/get/detail')
  public async getDocContent() {
    const { ctx, service } = this;
    const { id }: any = ctx.request.query;
    if (!id) return ctx.helper.fail({ ctx, data: null, message: '文档id不存在！' });
    const res: any = await service.doc.getApiContent({ id });
    if (res) {
      ctx.helper.success({ ctx, data: res, message: '获取成功' });
      let views = res.views;
      views++;
      service.doc.update(id, { views });
      console.log(id, '请求次数');
    } else {
      ctx.helper.fail({ ctx, data: null, message: '找不到对应文档！' });
    }
  }
  /**
   * @summary 获取api文档列表
   * @description 获取api文档列表
   * @router get /doc/doc/list
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/doc/doc/list')
  public async getDocList() {
    const { ctx, service } = this;
    /* 分页功能 */
    const { page = 1, pageSize = 5, normal }: any = ctx.request.query;
    const offset = (page * 1 - 1) * (pageSize * 1);
    const { rows, count } = await service.doc.getApiList({}, pageSize * 1, offset);
    if (Array.isArray(rows)) {
      const responseList = rows.map((item: any) => {
        const value = item.dataValues;
        if (normal * 1 === 1) {
          value.content = filterHTMLTag(marked(value.content)).slice(0, 400);
        }
        return value;
      });
      ctx.helper.success({ ctx, data: {
        list: responseList,
        totalCount: count,
        page,
        pageSize,
      }, message: '创建成功' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '没有数据' });
    }
  }
  /**
   * @summary 编辑文档
   * @description 编辑api和blog文档
   * @router put /api/doc/:id/edit
   * @request body editDocRequest *body
   * @response 200 baseResponse 编辑成功
   */
  @put('/api/doc/:id/edit')
  public async editDoc() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.editDocRequest);
    const { id } = ctx.params;
    if (!id) return ctx.helper.fail({ ctx, data: null, message: '文档id不能为空' });
    const payload = ctx.request.body || {};
    if (ctx.__id !== payload.uid) ctx.helper.fail({ ctx, data: null, message: '只能编辑属于自己的文档' });
    const result = await service.doc.update(id, payload);
    if (result && result.length > 0) {
      ctx.helper.success({ ctx, data: null, message: '修改成功！' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '出现错误！' });
    }
  }
  /**
   * @summary 删除文档
   * @description 删除文档
   * @router delete /api/doc/:id/delete
   * @request path
   * @response 200 baseResponse 删除成功
   */
  @Delete('/api/doc/:id/delete')
  public async deleteDoc() {
    const { ctx, service, app } = this;
    const { id } = ctx.params;
    if (!id) return ctx.helper.fail({ ctx, data: null, message: '文档id不能为空' });
    const res = await service.doc.deleteDoc(id);
    if (res === 1) {
      ctx.helper.success({ ctx, data: null, message: '删除成功！' });
      /* 缓存获取标签信息 */
      const currentRedisKey = DOC_ID_MAP_TAG_ID + String(id);
      const tagId = await app.redis.get(currentRedisKey);
      if (tagId) {
        this.deleteDocFromTagList(Number(id), Number(tagId));
        app.redis.del(currentRedisKey);
      }
    } else {
      ctx.helper.fail({ ctx, data: null, message: '出现错误，删除失败' });
    }
  }
  /**
   * @summary 文档置顶/取消置顶
   * @description 控制文档置顶取消置顶
   * @router get /api/doc/top
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/api/doc/:id/top')
  public async topDoc() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    if (!id) ctx.helper.fail({ ctx, data: null, message: '文档id不能为空' });
    const res: any = await service.doc.getApiContent({ id });
    const r = res.top ? 0 : 1;
    const result = await service.doc.update(id, { top: r });
    if (result && result.length > 0) {
      ctx.helper.success({ ctx, data: null, message: '操作成功！' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '出现错误！' });
    }
  }
}
