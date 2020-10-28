/**
 * 用户表模型
 */
export default App => {
  const { STRING, DATE, NOW, INTEGER, TINYINT, TEXT } = App.Sequelize;
  const User = App.model.define('user', {
    /* 用户ID */
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    /* 用户名 */
    username: { type: STRING(30), allowNull: false },
    /* 密码 */
    password: { type: STRING(30), allowNull: false },
    /* 电话号 */
    phone: { type: STRING(20) },
    /* 头像 */
    avatar: { type: STRING, defaultValue: '' },
    /* 菜单 */
    menuList: { type: TEXT, defaultValue: JSON.stringify([]) },
    /* 权限列表 */
    roleList: { type: STRING, defaultValue: JSON.stringify([]) },
    /* 服务列表 */
    serviceList: { type: STRING, defaultValue: JSON.stringify([]) },
    /* 创建时间 */
    createAt: { type: DATE, defaultValue: NOW },
    /* 更新时间 */
    updateAt: { type: DATE },
    /* 微信账号 */
    weixin: { type: STRING(30) },
    /* 京东pin */
    pin: { type: STRING(40) },
    /* email邮箱 */
    email: { type: STRING(40) },
    /* 是否验证 */
    emailVerifyed: { type: TINYINT(1) },
    /* 是否接收 */
    receiveRemote: { type: TINYINT(1) },
  },
  {
    timestamps: false,
  },
  );
  User.sync({ force: false });
  return User;
}
;
