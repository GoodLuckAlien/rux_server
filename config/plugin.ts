import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};

export default plugin;
