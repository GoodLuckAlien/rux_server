/**
 * 文档评论模型
 */
export default App => {
  const { INTEGER, STRING, TEXT } = App.Sequelize;
  const commentModel = {
    /* 评论id */
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
    /* 父级评论id */
    pid: {
      type: INTEGER,
      allowNull: false,
    },
    /* github用户id */
    gid: {
      type: INTEGER,
      allowNull: false,
    },
    /* 评论内容 */
    content: {
      type: TEXT,
      allowNull: false,
    },
    /* GitHub昵称  */
    name: {
      type: STRING,
      allowNull: false,
    },
    /* html_url评论人GitHub链接地址 */
    htmlUrl: {
      type: STRING,
      allowNull: false,
    },
    /* github登录名 */
    login: {
      type: STRING,
      allowNull: false,
    },
    /* github头像url */
    avatarUrl: {
      type: STRING,
      allowNull: false,
    },
  };
  const Comment = App.model.define('comment', commentModel);
  Comment.sync({ force: false });
  return Comment;
}
;
