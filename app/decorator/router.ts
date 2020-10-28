
export type Method = 'get' | 'post' | 'delete' | 'put'

export type RouterItem = {
  method: Method;
  controller: string;
  url: string;
}


const routerGet: Array<RouterItem> = [];
const routerPost: Array<RouterItem> = [];
const routerPut: Array<RouterItem> = [];
const routerDelete: Array<RouterItem> = [];


function apply(routerItem: RouterItem) {
  return function handerController(target: any, name: any, descriptor: any) {
    const controller = target.constructor.name.toLowerCase();
    const method = descriptor.name || name;
    routerItem.controller = controller + '.' + method;
    return descriptor;
  };
}

export function post(url: string) {
  const routerItem: RouterItem = {
    method: 'post',
    controller: '',
    url,
  };
  routerPost.push(routerItem);
  return apply(routerItem);
}

export function get(url: string) {
  const routerItem: RouterItem = {
    method: 'get',
    controller: '',
    url,
  };
  routerGet.push(routerItem);
  return apply(routerItem);
}
export function Delete(url: string) {
  const routerItem: RouterItem = {
    method: 'delete',
    controller: '',
    url,
  };
  routerDelete.push(routerItem);
  return apply(routerItem);
}

export function put(url: string) {
  const routerItem: RouterItem = {
    method: 'put',
    controller: '',
    url,
  };
  routerPut.push(routerItem);
  return apply(routerItem);
}

export default {
  get: routerGet,
  post: routerPost,
  delete: routerDelete,
  put: routerPut,
}
;
