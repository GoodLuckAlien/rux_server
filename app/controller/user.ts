import { Controller } from 'egg';
import { post, get } from '../decorator/router';
import axios from 'axios';
import { OAUTH_CLIENT_ID, OAUTH_SECRET_KEY, ACCESS_TOKEN_URL } from '../utils/const';

/**
 * @Controller 管理端->用户模块
 */
export default class User extends Controller {
  /**
   * @summary github 授权登录
   * @description 用github登录
   * @router get /user/get/oauth
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @get('/user/get/oauth')
  public async oauthLogin() {
    const sendClientMes = [ 'login', 'avatar_url', 'id', 'html_url', 'name' ];
    const { ctx } = this;
    const { code } = ctx.request.query;
    const acccessTokenUrl = `${ACCESS_TOKEN_URL}client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_SECRET_KEY}&code=${code}`;
    const access_token = await axios({
      method: 'post',
      url: acccessTokenUrl,
      headers: {
        accept: 'application/json',
      },
    } as any).then(res => res.data.access_token);
    const res = await axios.get('https://api.github.com/user', {
      headers: {
        accept: 'application/json',
        Authorization: `token ${access_token}`,
      },
    }).then(res => res.data);
    const cookies = {};
    sendClientMes.forEach(item => {
      cookies[item] = res[item];
    });
    ctx.cookies.set('githubInfo', JSON.stringify(cookies));
    ctx.status = 302;
    ctx.redirect('http://127.0.0.1:5000/home');
  }
  /**
   * @summary oauth登录 - github
   * @description 用github登录
   * @router post user/github/oauth
   * @request path
   * @response 200 baseResponse 创建成功
   */
  @post('/user/github/oauth')
  public async oauthLoginGithub() {
    const redirect_uri = 'http://127.0.0.1:7001/user/get/oauth';
    const githubAuthorizeUrl = 'http://github.com/login/oauth/authorize?';
    const url = `${githubAuthorizeUrl}client_id=${OAUTH_CLIENT_ID}&redirect_uri=${redirect_uri}`;
    const { ctx } = this;
    ctx.helper.redirect({ ctx, data: url, message: '重定向' });
  }
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
