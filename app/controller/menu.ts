import { Controller } from 'egg';
import { post, get, Delete, put } from '../decorator/router';

/**
 * @Controller 管理端->菜单管理模块
 */

export default class Menu extends Controller {
  /**
   * 更新路由
   * @param callback 处理函数
   */
  private updateMenus(callback: (T: any) => Array<any>) {
    const { ctx, service } = this;
    process.nextTick(async () => {
      const userinfo = await service.user.getUserInfo(ctx.__id);
      if (userinfo) {
        const { menuList } = userinfo;
        const newMenuList = callback(menuList);
        service.user.update(ctx.__id, { menuList: JSON.stringify(newMenuList) });
      }
    });
  }
  /**
   * @summary 添加路由菜单
   * @description 路由配置添加菜单
   * @router post /api/menu/create
   * @request body createMenusRequest *body
   * @response 200 baseResponse 创建成功
   */
  @post('/api/menu/create')
  public async create() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createMenusRequest);
    const payload = Object.assign({}, ctx.request.body, { uid: ctx.__id });
    const res: any = await service.menus.create({
      ...payload,
      name: payload.name.replace(/\s+/g, ''),
      path: payload.path.replace(/\s+/g, ''),
    });
    if (res) {
      ctx.helper.success({ ctx, data: null, message: '创建成功' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '创建失败' });
    }
  }
  /**
   * @summary 获取路由列表
   * @description 获取路由列表
   * @router get /api/menu/list
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/api/menu/list')
  public async getList() {
    const { ctx, service } = this;
    const result = await service.menus.getList();
    ctx.helper.success({ ctx, data: result, message: '请求成功！' });
  }
  /**
   * @summary 删除路由
   * @description 删除路由
   * @router delete /api/menu/:id/delete
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @Delete('/api/menu/:id/delete')
  public async deleteMenu() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    if (!id) return ctx.helper.fail({ ctx, data: null, message: 'id不能为空' });
    const childrens = await service.menus.getRouterChildrenList(id);
    if (childrens.length > 0) return ctx.helper.fail({ ctx, data: null, message: '请先删除当前路由的子路由！' });
    const res = await service.menus.deleteSingleRouter(id);
    if (res === 1) {
      ctx.helper.success({ ctx, data: null, message: '删除成功！' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '出现错误，删除失败' });
    }
  }
  /**
   * @summary 编辑路由
   * @description 编辑路由
   * @router put /api/menu/:id/edit
   * @request body editDocRequest *body
   * @response 200 baseResponse 创建成功
   */
  @put('/api/menu/:id/edit')
  public async editMenus() {
    console.log(this.updateMenus);
    const { ctx, service } = this;
    ctx.validate(ctx.rule.editMenusRequest);
    const { id } = ctx.params;
    if (!id) return ctx.helper.fail({ ctx, data: null, message: 'id不能为空' });
    const payload = ctx.request.body || {};
    const result = await service.menus.update(id, payload);
    if (result && result.length > 0) {
      ctx.helper.success({ ctx, data: null, message: '修改成功！' });
    } else {
      ctx.helper.fail({ ctx, data: null, message: '出现错误！' });
    }
  }

}
