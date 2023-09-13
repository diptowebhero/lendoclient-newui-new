import {LOCALE_DIRECTION_KEY} from '@config';
import { getCookie } from "@helpers/cookie";

export const getLocale = (ctx) => {
    const cookie = getCookie(LOCALE_DIRECTION_KEY, ctx);
    if (
      getCookie(LOCALE_DIRECTION_KEY, ctx) !== null &&
      getCookie(LOCALE_DIRECTION_KEY, ctx) !== undefined
    ) {
      return cookie;
    } else {
      return null;
    }
  };