import { Controller } from 'egg';
import { post } from '../decorator/router';
import * as path from 'path';
import * as fs from 'fs';
import * as awaitStream from 'await-stream-ready';
import * as sendToWormhole from 'stream-wormhole';

const awaitWriteStream = awaitStream.write;

/**
 * @Controller 管理端->上传模块
 */
export default class Upload extends Controller {

  /**
   * @summary 上传图片
   * @description 上传图片 ，头像上传等
   * @router post /api/upload/image
   * @request body baseRequest *body
   * @response 200 baseResponse 创建成功
   */
  @post('/api/upload/image')
  public async uploadImage() {
    const { ctx, service } = this;
    const imgHashName = Math.ceil(Math.random() * 99999) + '_' + Math.floor(new Date().getTime() / 1000);
    const image = await service.user.getUserImage(ctx.__id);
    const steam = await ctx.getFileStream();
    const host = ctx.request.header.host;
    const extname = path.extname(steam.filename).toLocaleLowerCase();
    const imageName = imgHashName + extname;
    const target = path.join(this.config.baseDir, 'app/public/img', imageName);
    const writeSteam = fs.createWriteStream(target);
    const saveName = `http://${host}/public/img/${imageName}`;
    try {
      await awaitWriteStream(steam.pipe(writeSteam));
      /* 头像存入数据库 */
      const saveImageResult = await service.user.update(ctx.__id, { avatar: saveName });
      if (saveImageResult && saveImageResult.length > 0) {
        ctx.helper.success({ ctx, data: { avatar: saveName }, message: '请求成功！' });
        /* 删除之前原文件 */
        if (image) service.common.deleteFile(image);
      } else {
        ctx.helper.fail({ ctx, data: null, message: '出现异常！' });
      }
    } catch (e) {
      await sendToWormhole(steam);
      ctx.helper.fail({ ctx, message: e });
      throw e;
    }
  }
}
