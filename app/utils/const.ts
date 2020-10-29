

export const CODE = {
  success: /* 成功返回 */ 0,
  fail: /* 返回失败 */  500,
  expire: /* token过期 */ 401,
  redirect: 302,
};

export const DEFAULT_MESSAGE = {
  success: '请求成功！',
  fail: '请求失败！',
  expire: 'token过期请从新登陆',
};

/* oauth : github:Client ID*/
export const OAUTH_CLIENT_ID = '48769c556137f567caaa'
;

/* oauth:github: secret */
export const OAUTH_SECRET_KEY = '14959a44d8f7a6aa1bcb69b4a442966d02bc4ff9'
;

/* gethub: get AccessToken url  */
export const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token?';
