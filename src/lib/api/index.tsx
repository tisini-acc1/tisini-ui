import Cookie, { getCookieToken } from "../services/cookie-service";

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
const privTisiniApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    Authorization: "JWT " + getCookieToken('ts-user-c1d2625da1e943284683')?.['accessToken']
  },
  withCredentials: true,
});

export { tisiniAxios, privTisiniApi}

// eslint-disable-next-line react-refresh/only-export-components
export default Object.freeze({
  tisiniAxios,
  privTisiniApi,
});
