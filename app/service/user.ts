import { Service } from 'egg';
import * as moment from 'moment';

export default class User extends Service {

  /**
   * 根据ID 查找
   * @param userId
   */
  public async find(userId: number) {
    return await this.ctx.model.User.findByPk(userId);
  }
  /**
   * 验证用户名是否存在
   * @param username 待验证用户名
   */
  public async veriyUsername(username: string) {
    return this.ctx.model.User.findOne({
      where: {
        username,
      },
    });
  }
  /**
    * 获取用户信息
    * @param id 获取用户信息
    */
  public async getUserInfo(id: any) {
    let response: any = null;
    const result = await this.ctx.model.User.findOne({
      where: {
        id,
      },
    });
    if (result) {
      const { dataValues } = result;
      response = {
        ...dataValues,
        menuList: JSON.parse(dataValues.menuList),
        roleList: JSON.parse(dataValues.roleList),
        serviceList: JSON.parse(dataValues.serviceList),
      };
      delete response.password;
    } else {
      response = null;
    }
    return response;
  }

  /**
   * 注册
   * @param payload 用户名信息
   */
  public async register(payload: any) {
    return this.ctx.model.User.create(payload);
  }
  /**
   * 登陆
   * @param payload 登陆信息
   */
  public async login(payload: any) {
    const { password, username } = payload;
    return this.ctx.model.User.findOne({
      where: {
        password,
        username,
      },
    });
  }
  /**
   * 登陆鉴权
   * @param userId 用户id
   */
  public async makeToken(userId: any) {
    const { ctx } = this;
    return await ctx.app.jwt.sign({
      data: {
        _id: userId,
      },
      exp: Math.floor(Date.now() / 1000 + (60 * 60 * 70)),
    }, ctx.app.config.jwt.secret);

  }

  /**
   * 获取图片信息
   * @param userId
   */
  public async getUserImage(userId: number) {
    const result = await this.find(userId);
    if (result) {
      return result.dataValues.avatar;
    }
    return null;

  }

  /**
   * 修改用户信息
   * @param userId
   */
  public async update(userId: number, payload: any) {
    payload.updateAt = moment(new Date().getTime() + 8 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
    const result = await this.ctx.model.User.update(payload, {
      where: {
        id: userId,
      },
    });
    return result;
  }
}
