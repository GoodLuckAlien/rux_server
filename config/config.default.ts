import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '_1585631803741_3460';

  /* 配置sequelize */
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'config',
  };

  /* 配置redis */
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'auth',
      db: 0,
    },
  };
  /* 配置swaggerdoc */
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '配置中心接口文档',
      description: '接口文档 swagger-ui for config',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: true,
    // enableValidate: true,
    routerMap: true,
    enable: true,
    securityDefinitions: {
      apikey: {
        type: 'authorization',
        name: 'authorization',
        in: 'header',
      },
    },
  };

  config.middleware = [ 'handerToken' ];

  /* 配置跨域 */
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  /* 配置属权token */
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: /^\/api/, // optional
  };

  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
