import { Controller } from 'egg';
import { post, get } from '../decorator/router';
/**
 * @Controller 管理端->用户模块
 */
export default class User extends Controller {

  /**
   * @summary 获取用户信息
   * @description 登陆获取用户个人信息
   * @router get /api/user/info
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/api/user/info')
  public async getUserInfo() {
    const { ctx, service } = this;
    const result = await service.user.getUserInfo(ctx.__id);
    if (result) {
      ctx.helper.success({ ctx, data: result, message: '请求成功！' });
    } else {
      ctx.helper.fail({ ctx, data: null });
    }
  }

  /**
   * @summary 用户登陆
   * @description 登陆操作
   * @router post /user/login
   * @request body loginUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  @post('/user/login')
  public async login() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.loginUserRequest);
    const result = await service.user.login(ctx.request.body);
    if (result) {
      const id = result.dataValues.id;
      const token = await service.user.makeToken(id);
      return ctx.helper.success({ ctx, data: token, message: '请求成功！' });
    }
    ctx.helper.fail({ ctx, data: null, message: '用户名或密码错误' });
  }

  /**
   * @summary 验证用户名
   * @description 创建用户，验证用户名是否存在
   * @router get /user/verifyUsername
   * @request path string *name  用户ID
   * @response 200 baseResponse 验证成功
   */
  @get('/user/verifyUsername')
  public async verify() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.verifyUsername, ctx.query);
    const { name } = ctx.query;
    let status: number;
    const result = await service.user.veriyUsername(name);
    if (result) {
      status = 0;
    } else {
      status = 1;
    }
    ctx.helper.success({ ctx, data: status, message: '请求成功！' });
  }

  /**
   * @summary 用户注册
   * @description 创建用户，验证用户名是否存在
   * @router post /user/register
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  @post('/user/register')
  public async register() {
    const { ctx, service } = this;
    const { body } = ctx.request;
    ctx.validate(ctx.rule.createUserRequest);
    const verify = await service.user.veriyUsername(body.username);
    if (verify) {
      ctx.helper.fail({ ctx, data: {}, message: '当前用户已存在！' });
    } else {
      const result = await service.user.register(body);
      result && ctx.helper.success({ ctx, data: {}, message: '注册成功！' });
    }
  }
}
