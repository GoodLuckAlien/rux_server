import { Context } from 'egg';


export default function() {
  return async function(ctx: Context, next: Function) {
    const { user } = ctx.state;
    if (user) {
      const { exp, data } = user;
      const now = Math.ceil(new Date().getTime() / 1000);
      if (now >= exp) { /* 用户过期 */
        ctx.helper.expire({ ctx });
      } else {
        ctx.__id = data._id;
        await next();
      }
    } else {
      await next();
    }
  };

}

