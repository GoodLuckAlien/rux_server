import { Service } from 'egg';

class Tag extends Service {
  /**
    * 创建标签
    */
  async create(payload) {
    return await this.ctx.model.models.tag.create(payload);
  }
  /**
   * 获取标签列表
   */
  async getList(payload = {}) {
    return await this.ctx.model.models.tag.findAll({ where: payload });
  }
  /**
   * 根据ID查找标签
   */
  async getTagById(id) {
    return await this.ctx.model.models.tag.findOne({ where: { id } });
  }
  /*
  * 查询文档列表(带分页)
  */
  async getPageList(payload, limit, offset) {
    return await this.ctx.model.models.tag.findAndCountAll({ where: payload, limit, offset });
  }
  /**
   * 删除标签
   */
  async deleteTag(id: any) {
    return await this.ctx.model.models.tag.destroy({
      where: {
        id,
      },
    });
  }
  /**
   * 修改标签
   * @param id 标签
   * @param payload  修改标签
   */
  async update(id: number, payload: any) {
    return await this.ctx.model.models.tag.update(payload, {
      where: {
        id,
      },
    });
  }
}

export default Tag
;
