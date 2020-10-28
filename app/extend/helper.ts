import { Context } from 'egg';
import { CODE, DEFAULT_MESSAGE } from '../utils/const';

export interface helperParamType {
  ctx: Context;
  data?: any;
  message?: string;
}

const handerReponse = {};

Object.keys(CODE).forEach(name => {
  handerReponse[name] = function(helperParam: helperParamType) {
    const { ctx, data, message } = helperParam;
    ctx.body = {
      code: CODE[name],
      data,
      message: message || DEFAULT_MESSAGE[name],
    };
  };
});

export default handerReponse
;
