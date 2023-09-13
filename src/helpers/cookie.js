import cookie from "js-cookie";
import uniqueId from "@helpers/generateUniqueId";
import nextCookies from "next-cookies";
import get from "lodash/get";

export function saveCookie(key, value) {
    const uniqueKey = `${key}_${uniqueId()}`;
    cookie.set(uniqueKey, value, {
        path: "/",
    });
}
export function removeCookie(key) {
    const uniqueKey = `${key}_${uniqueId()}`;
    cookie.remove(uniqueKey);
}



export function getCookie(key, ctx) {
    const uniqueKey = `${key}_${uniqueId(ctx)}`;
    return ctx && ctx.req
        ? get(nextCookies(ctx), uniqueKey, undefined)
        : cookie.get(uniqueKey);
}

