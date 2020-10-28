import { Service } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 公共方法类
 */
export default class Common extends Service {

  /**
   * 删除文件
   * @param imageName 文件路径
   */
  async deleteFile(imageName: string) {
    const imgPath = path.join(this.config.baseDir, 'app/public/img', path.basename(imageName));
    fs.unlinkSync(imgPath);
  }
}
