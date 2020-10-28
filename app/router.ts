import { Application } from 'egg';

import Router, { Method, RouterItem } from './decorator/router';


export const methods: Array<Method> = [ 'get', 'post', 'put', 'delete' ];

export default (app: Application) => {
  const { router } = app;
  methods.forEach((method: Method) => {
    Router[method].forEach((item: RouterItem) => {
      const { url, method, controller } = item;
      const [ path, descriptor ] = controller.split('.');
      router[method](url, app.controller[path][descriptor]);
    });
  });
};
