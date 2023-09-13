// import Router from "next/router";
import { getCookie, removeCookie } from "@helpers/cookie";
// import { ROUTE_HOME } from "@routes";
import { KEY_TOKEN, KEY_USER } from "@config";

// export const auth = async ctx => {
//   const accessToken = getCookie(KEY_TOKEN, ctx);
//   if (ctx.req && !accessToken) {
//     ctx?.res?.writeHead(302, { Location: ROUTE_HOME });
//     ctx?.res?.end();
//     return;
//   }
//   if (!accessToken) {
//     await router.replace(ROUTE_HOME);
//   }
// };
export const noAuth = ctx => {
  const token = getToken(ctx);
  if (ctx.req && token) {
    // ctx.res.writeHead(302, { Location: routes.ROUTE_PROFILE });
    ctx?.res?.end();
    return;
  }
  if (token) {
    // router.replace(routes.ROUTE_PROFILE);
  }
};
export const getToken = ctx => {
  const cookie = getCookie(KEY_TOKEN, ctx);
  if (
    getCookie(KEY_TOKEN, ctx) !== null &&
    getCookie(KEY_TOKEN, ctx) !== undefined
  ) {
    if (ctx) {
      return cookie;
    } else {
      return cookie;
    }
  } else {
    return null;
  }
};
export const getUser = ctx => {
  const cookie = getCookie(KEY_USER, ctx);
  if (
    getCookie(KEY_USER, ctx) !== null &&
    getCookie(KEY_USER, ctx) !== undefined
  ) {
    return JSON.parse(cookie);
  } else {
    return null;
  }
};
export const isAuth = ctx => {
  const cookie = getCookie(KEY_TOKEN, ctx);
  if (
    getCookie(KEY_TOKEN, ctx) !== null &&
    getCookie(KEY_TOKEN, ctx) !== undefined
  ) {
    const accessToken = cookie;
    return !!accessToken;
  } else {
    return false;
  }
};
export const removeCredentials = (redirect, toLogin) => {
  removeCookie(KEY_USER);
  removeCookie(KEY_TOKEN);

  //   if (redirect) {
  //     if (toLogin) {
  //       await router.replace(HOME, HOME);
  //       return;
  //     }
  //     await router.replace(HOME);
  //   }
};
