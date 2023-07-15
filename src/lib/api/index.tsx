import {
  getCookieToken,
  removeToken,
  setCookieToken,
} from "../services/cookie-service";
import jtwDecode, { JwtPayload } from "jwt-decode";

import TisiniconfigService from "../config";
import axios from "axios";

const baseURL =
  TisiniconfigService.getKey("MODE") === "development"
    ? TisiniconfigService.getKey("VITE_API_DEV_BACKEND_URL")
    : TisiniconfigService.getKey("VITE_API_PROD_BACKEND_URL");
const tisiniAxios = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});
const privateAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    Authorization:
      "JWT " +
        getCookieToken("tisini-tokens-369340a21d88d03d9509")?.["accessToken"] ??
      "",
  },
  withCredentials: true,
});

// const pri = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     "Access-Control-Allow-Headers":
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
//     "Access-Control-Allow-Credentials": "true",
//   },
//   withCredentials: true,
// });

// Add a request interceptor to add the JWT token to the authorization header
privateAxios.interceptors.request.use(
  async (config) => {
    const token = getCookieToken("tisini-tokens-369340a21d88d03d9509");
    // console.log("token: " + JSON.stringify(token));

    if (!token) {
      return Promise.reject(config);
    }
    if (token) {
      config.headers.Authorization = `JWT ${token.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to refresh the JWT token if it's expired
privateAxios.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/require-await
  async (response) => response,
  async (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const originalRequest = error.config;
    // console.log('Response error: ' + JSON.stringify(error.response));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      originalRequest._retry = true;
      const tokenPayload = getCookieToken("tisini-tokens-369340a21d88d03d9509");
      if (!tokenPayload) {
        return Promise.reject(error);
      }
      const decodedToken = jtwDecode<JwtPayload>(tokenPayload.refreshToken);
      console.log("decodedToken: " + JSON.stringify(decodedToken));

      const currentTime = new Date().getTime() / 1000;
      if (decodedToken.exp! < currentTime) {
        removeToken("tisini-tokens-369340a21d88d03d9509");
        return Promise.reject(error);
      }
      if (!decodedToken) {
        removeToken("tisini-tokens-369340a21d88d03d9509");
        return Promise.reject(error);
      }
      const refreshToken = tokenPayload.refreshToken;
      const res = await tisiniAxios.post("/auth/refresh-token", {
        refreshToken,
      });

      if (res.status === 201 || res.status === 200) {
        // console.log("New token received: " + JSON.stringify(res.data));
        // authStore.updateRefreshToken(res.data.refreshToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCookieToken(res.data);
        privateAxios.defaults.headers.common["Authorization"] =
          "JWT " +
          getCookieToken("tisini-tokens-369340a21d88d03d9509").accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        originalRequest.headers["Authorization"] =
          "JWT " +
          getCookieToken("tisini-tokens-369340a21d88d03d9509").accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return privateAxios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
function getWebSocketAddress(url: string): string {
  // eslint-disable-next-line no-useless-escape
  const pattern = /(http|https):\/\/([^\/]+)/gi;
  // const prodRegex = new RegExp(/(http|https):\/\/([^\/]+)/);
  // const pattern = isDev ? devRegex : prodRegex;
  const match = url.match(pattern);
  // console.log("match", match);

  if (match) {
    // const protocol = match[1] === "http" ? "ws" : "wss";
    // const hostname = match[2];
    // const port = match[3];

    // const prodUrl = `${protocol}://${hostname}`;
    return match[0].replace(/http/, "ws"); //isDev ? `${protocol}://${hostname}:${port}` : prodUrl;
  } else {
    console.log("No match found for url", url);
    return url;
  }
}
export const wsURL = getWebSocketAddress(baseURL);

export { tisiniAxios, privateAxios };

// eslint-disable-next-line react-refresh/only-export-components
export default Object.freeze({
  tisiniAxios,
  privateAxios,
});
