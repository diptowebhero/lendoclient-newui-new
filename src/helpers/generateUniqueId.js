import cookie from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import nextCookies from "next-cookies";
import get from "lodash/get";
import { APP_UUID_KEY } from "@config";

const APP_UUID_COOKIE = APP_UUID_KEY;

export default function (ctx) {
  let uniqueId = undefined;
  if (ctx && ctx.req) {
    uniqueId = get(nextCookies(ctx), APP_UUID_COOKIE, undefined);
  } else {
    uniqueId = cookie.get(APP_UUID_COOKIE);
  }
  if (uniqueId) {
    return uniqueId;
  } else {
    uniqueId = uuidv4();
    cookie.set(APP_UUID_COOKIE, uniqueId, { path: "/" });
    return uniqueId;
  }
}
