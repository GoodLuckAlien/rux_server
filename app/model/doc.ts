/**
 *  文档相关
 */
export default App => {
  const { INTEGER, DATE, NOW, STRING, TEXT } = App.Sequelize;
  const Doc = App.model.define('doc', {
    /* 菜单id */
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    /* 文档内容 */
    content: {
      type: TEXT,
      allowNull: false,
    },
    /* 文档标题 */
    name: {
      type: STRING,
      allowNull: false,
    },
    /* 作者id */
    uid: {
      type: INTEGER,
    },
    /* 作者名字 */
    author: {
      type: STRING,
    },
    /* 图片路径 */
    url: {
      type: STRING,
    },
    /* 标签列表 */
    tagList: { type: STRING, defaultValue: JSON.stringify([]) },
    /* 文档类型 */
    type: {
      type: STRING,
      allowNull: false,
    },
    /* 浏览量 */
    views: {
      type: INTEGER,
      defaultValue: 0,
    },
    /* 是否置顶 */
    top: {
      type: INTEGER,
      defaultValue: 0,
    },
    /* 点赞量 */
    star: {
      type: INTEGER,
      defaultValue: 0,
    },
    /* 收藏 */
    collect: {
      type: INTEGER,
      defaultValue: 0,
    },
    /* 创建时间 */
    createAt: { type: DATE, defaultValue: NOW },
    /* 更新时间 */
    updateAt: { type: DATE },
  }, {
    timestamps: false,
  });
  Doc.sync({ force: false });
  return Doc;
}
;
