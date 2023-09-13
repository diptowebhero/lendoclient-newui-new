import { create } from "apisauce";
import {
  HTTP_STATUS_CODE_OK,
  HTTP_STATUS_CODE_NO_CONTENT,
  HTTP_STATUS_CODE_CREATED,
  HTTP_STATUS_CODE_UNAUTHORIZED,
  HTTP_STATUS_CODE_FORBIDDEN,
  HTTP_STATUS_CODE_NOT_FOUND,
  HTTP_STATUS_CODE_SERVER_ERROR,
  HTTP_STATUS_CODE_BAD_REQUEST,
} from "./consts";
import { removeCredentials, getToken } from "@src/helpers/authUtils";
import { API_URL } from "@src/config";
import message from "../message";
import { ROUTE_HOME } from "@src/routes";
import { get } from "lodash";





export const api = create({
  baseURL:"http://93.189.91.137:8080/api"|| API_URL,
  timeout: 30000,
  headers: {
    // "accept-language ": "en",
    "Content-Type": "application/json; charset=utf-8; v=1.0",
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
  },
});

// api.addRequestTransform(request => {
//   request.params["timestamp"] = Date.now();
// });

api.addResponseTransform(response => {
  switch (response.status) {
    case HTTP_STATUS_CODE_UNAUTHORIZED:
      if (typeof window !== "undefined") {
        removeCredentials();
        window.location.replace(ROUTE_HOME);
      }
      break;
    case HTTP_STATUS_CODE_FORBIDDEN:
      if (typeof window !== "undefined") {
        window.location.replace(ROUTE_HOME);
      }
      break;
    case HTTP_STATUS_CODE_NOT_FOUND:
      if (typeof window !== "undefined") {
        message("error", response.data.message);
        window.location.replace(ROUTE_HOME);
      }
      break;
    case HTTP_STATUS_CODE_SERVER_ERROR:
      if (typeof window !== "undefined") {
        message("error", response.data.message);
      }
      break;
    case HTTP_STATUS_CODE_BAD_REQUEST:
      if (typeof window !== "undefined") {
        message("error", response.data.message);
      }
      break;
  }
  if (
    response.status === HTTP_STATUS_CODE_OK ||
    response.status === HTTP_STATUS_CODE_CREATED ||
    response.status === HTTP_STATUS_CODE_NO_CONTENT
  ) {
    return response;
  } else {
    throw response;
  }
});

function createRequestHeaders(ctx) {
  const headers = {};
  const token = getToken(ctx);
  if (ctx && ctx.req) {
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const userAgent = ctx.req && ctx.req.headers["user-agent"];
    if (userAgent) {
      headers["User-Agent"] = userAgent;
    }
  } else {
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
}

export async function getRequest(url, params, ctx) {
  console.log('get request - ', url, params)
  return api.get(url, params, { headers: createRequestHeaders(ctx) });
}

export async function postRequest(url, body, ctx) {
  return api.post(url, body, { headers: createRequestHeaders(ctx) });
}

export async function patchRequest(url, body, data, ctx) {
  return api.patch(url, body, {
    params: data,
    headers: createRequestHeaders(ctx),
  });
}

export async function putRequest(url, body, ctx) {
  return api.put(url, body, { headers: createRequestHeaders(ctx) });
}


export async function deleteRequest(url, params, data, ctx) {
  return api.delete(url, params, { data, headers: createRequestHeaders(ctx) });
}


export async function deleteWalletRequest(url, data, ctx) {
  return api.post(url, data, { headers: { 'X-HTTP-Method-Override': 'DELETE' } });
}

export async function getWalletRequest(url, data, ctx) {
  return api.post(url, data, { headers: { 'X-HTTP-Method-Override': 'GET' } });
}

export function redirectOnServer(apiResponse) {
  console.log('apiResponse :>> ', apiResponse.status, apiResponse.body);
  const { status } = apiResponse;
  const message = get(apiResponse, "data.message", "");
  const replaceWithDash = ""// message?.replaceAll(" ", "-");
  switch (status) {
    case 500:
      return {
        redirect: {
          permanent: true,
          destination: `/serverError500/?error=${replaceWithDash}`,
        },
      };
    case 404:
      return {
        redirect: {
          permanent: true,
          destination: "/serverError404",
        },
      };
    case 401:
      return {
        redirect: {
          permanent: true,
          destination: `${ROUTE_HOME}?loggedout=true`,
        },
      };

    case 403:
      return {
        redirect: {
          permanent: true,
          destination: "/",
        },
      };
    default:
      return {
        redirect: {
          permanent: true,
          destination: `/?error=${replaceWithDash}`,
        },
      };
  }
}



