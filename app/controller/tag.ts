import { Controller } from 'egg';
import { post, get, Delete } from '../decorator/router';

/**
 * @Controller 管理端->标签模块
 */

export default class Tag extends Controller {
  /**
   * @summary 创建标签
   * @description 创建标签
   * @router post /api/tag/create
   * @request body createTagRequest *body
   * @response 200 baseResponse 创建成功
   */
  @post('/api/tag/create')
  async createTag() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createTagRequest, ctx.request.body);
    const payload = ctx.request.body;
    const res = await service.tag.create(payload);
    if (res) {
      ctx.helper.success({ ctx, data: null, message: '创建成功' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '创建失败' });
    }
  }
  /**
   * @summary 获取标签列表
   * @description 创建标签
   * @router get /get/tag/list
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/get/tag/list')
  async getTagList() {
    const { ctx, service } = this;
    const result = await service.tag.getList();
    ctx.helper.success({ ctx, data: result, message: '请求成功！' });
  }
  /**
   * @summary 获取标签列表(带分页效果)
   * @description 创建标签
   * @router get /page/tag/list
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/page/tag/list')
  async getPageTagList() {
    const { ctx, service } = this;
    const { page = 1, pageSize = 3 }: any = ctx.request.query;
    const offset = (page * 1 - 1) * (pageSize * 1);
    const { rows, count } = await service.tag.getPageList({}, pageSize * 1, offset);
    if (Array.isArray(rows)) {
      const responseList = rows.map((item: any) => item.dataValues);
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
   * @summary 删除标签
   * @description 删除标签
   * @router delete /api/tag/:id/delete
   * @request path
   * @response 200 baseResponse 删除成功
   */
  @Delete('/api/tag/:id/delete')
  async deleteTag() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const currentTag: any = await service.tag.getTagById(id);
    if (currentTag) {
      const { docArr } = currentTag.dataValues;
      if (JSON.parse(docArr).length === 0) {
        const res = await service.tag.deleteTag(id);
        if (res === 1) {
          ctx.helper.success({ ctx, data: null, message: '删除成功！' });
        } else {
          ctx.helper.fail({ ctx, data: null, message: '出现错误' });
        }

      } else {
        ctx.helper.fail({ ctx, data: null, message: '当前标签下存在文档，不能删除！' });
      }
    } else {
      ctx.helper.fail({ ctx, data: null, message: '无效的标签id' });
    }
  }
}
