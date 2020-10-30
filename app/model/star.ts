/**
 * 点赞记录模型
 */
export default App => {
  const { INTEGER } = App.Sequelize;
  const starModel = {
    /* 点赞记录id */
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    /* 文档id */
    cid: {
      type: INTEGER,
      allowNull: false,
    },
    /* github用户id */
    gid: {
      type: INTEGER,
      allowNull: false,
    },
  };
  const Star = App.model.define('star', starModel);
  Star.sync({ force: false });
  return Star;
}
;
