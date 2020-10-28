/**
 * 路由菜单模型
 */
export default App => {
  const { INTEGER, DATE, NOW, STRING } = App.Sequelize;
  const Menu = App.model.define('menu', {
    /* 菜单id */
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    /* 用户ID */
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    /* 父级ID */
    pid: {
      type: INTEGER,
      allowNull: false,
    },
    /* 创建时间 */
    createAt: { type: DATE, defaultValue: NOW },
    /* 更新时间 */
    updateAt: { type: DATE },
    /* 名称 */
    name: {
      type: STRING(30), allowNull: false,
    },
    /* 路径 */
    path: {
      type: STRING(50), allowNull: false,
    },
    /* 图标 */
    icon: {
      type: STRING,
    },
    /* 服务名称 */
    serviceName: { type: STRING },
  }, {
    timestamps: false,
  });
  process.nextTick(() => {
    Menu.belongsTo(App.model.User, { as: 'userTable', foreignKey:
    'uid', targetKey: 'id' });
  });
  Menu.sync({ force: false });
  return Menu;
}
;
