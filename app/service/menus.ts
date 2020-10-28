import { Service } from 'egg';
import * as moment from 'moment';


class Menus extends Service {

  /**
  * 创建路由菜单
  * @param payload
  */
  async create(payload: any) {
    return await this.ctx.model.models.menu.create(payload);
  }
  /**
   * 获取路由列表
   */
  async getList(id?: any) {
    return await this.ctx.model.models.menu.findAll({ where: { uid: id ? id : this.ctx.__id } });
  }
  /**
   * 获取当前路由的子路由
   * @param pid fu
   */
  async getRouterChildrenList(pid: number) {
    return await this.ctx.model.models.menu.findAll({
      where: {
        uid: this.ctx.__id,
        pid,
      },
    });
  }
  /**
   * 删除当前路由
   * @param id 路由id
   */
  async deleteSingleRouter(id: number) {
    return await this.ctx.model.models.menu.destroy({
      where: {
        id,
      },
    });
  }
  /**
   * 修改路由
   * @param id 路由ID
   * @param payload  修改参数
   */
  async update(id: number, payload: any) {
    payload.updateAt = moment(new Date().getTime() + 8 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
    return await this.ctx.model.models.menu.update(payload, {
      where: {
        id,
      },
    });
  }

}


export default Menus
;
