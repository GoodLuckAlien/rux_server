/**
 * 标签数据模型
 */

export default App => {
  const { INTEGER, STRING } = App.Sequelize;
  const Tag = App.model.define('tag', {
    /* 主键id */
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    /* 名称 */
    name: {
      type: STRING,
      allowNull: false,
    },
    /* 文档数组 */
    docArr: {
      type: STRING,
      defaultValue: JSON.stringify([]),
    },
    /* 文档数量 */
    num: {
      type: INTEGER,
      defaultValue: 0,
    },
    /* 是否启用 / 禁用 */
    open: {
      type: INTEGER,
      defaultValue: 1,
    },
    /* 是否是热搜标签 */
    hot: {
      type: INTEGER,
      defaultValue: 0,
    },
    /* 图标 */
    icon: {
      type: STRING,
    },
  });
  Tag.sync({ force: false });
  return Tag;
}
;
