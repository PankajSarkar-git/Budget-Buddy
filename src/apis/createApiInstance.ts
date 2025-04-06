import axios from "axios";

import { noTokenEndPoint, multipartHeaderEndPoint } from "./checkingEndPoint";
// import store from "../store";
let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const defaultTimeout = 40000;

const handleRequest = (config: any) => {
  const accessToken = store.getState().auth.token;
  const addToken = noTokenEndPoint.includes(config.url);
  if (addToken) {
    return {
      ...config,
      headers: {
        ...config.headers
      }
    };
  } else {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    };
  }
};

const createApiInstance = (baseURL: string, name = "") => {
  const api = axios.create({ baseURL, timeout: defaultTimeout });

  if (!baseURL) {
    throw new Error(`${name} baseURL not set during built. Please, set baseURL`);
  }

  api.interceptors.request.use(handleRequest);

  api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return error;
    }
  );

  return {
    instance: api
  };
};

export default createApiInstance;
