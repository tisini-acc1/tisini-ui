import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"?
'http://tisini.co.ke:3000/api/v1':process.env.API_PROD_BACKEND_URL;
  // configService.getKey("NODE_ENV") === "development"
  //   ? configService.getKey("API_DEV_BACKEND_URL")
  //   : configService.getKey("API_PROD_BACKEND_URL");


const pubTisiniApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});
// console.log('Tokens: ' + authStore.getAccessToken + ' ' + authStore.getRefreshToken);

const privTisiniApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
   
  },
  withCredentials: true,
});

// Add a request interceptor to add the JWT token to the authorization header
// privTisiniApi.interceptors.request.use(
//   async (config) => {
//     const token = getCookieToken("ts-ka-369340a21d88d03d9509");
//     // console.log("token: " + JSON.stringify(token));

//     if (!token) {
//       return Promise.reject(config);
//     }
//     if (token) {
//       config.headers.Authorization = `JWT ${token.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Add a response interceptor to refresh the JWT token if it's expired
// privTisiniApi.interceptors.response.use(
//   async (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("originalRequest: " + JSON.stringify(originalRequest));

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const tokenPayload = getCookieToken("ts-ka-369340a21d88d03d9509");
//       if (!tokenPayload) {
//         return Promise.reject(error);
//       }
//       const decodedToken = jwtDecode<JwtPayload>(tokenPayload.refreshToken);
//       console.log("decodedToken: " + JSON.stringify(decodedToken));

//       const currentTime = new Date().getTime() / 1000;
//       if (decodedToken.exp! < currentTime) {
//         removeToken("ts-ka-369340a21d88d03d9509");
//         await router.push({ name: "Login" });
//         return Promise.reject(error);
//       }
//       if (!decodedToken) {
//         removeToken("ts-ka-369340a21d88d03d9509");
//         await router.push({ name: "Login" });
//         return Promise.reject(error);
//       }
//       const refreshToken = tokenPayload.refreshToken;
//       const res = await pubTisiniApi.post("/auth/refresh-token", {
//         refreshToken,
//       });

//       if (res.status === 201 || res.status === 200) {
//         // console.log("New token received: " + JSON.stringify(res.data));
//         const authStore = useAuthStore();
//         authStore.updateTokens(res.data.refreshToken);
//         setCookieToken(res.data as any);
//         privTisiniApi.defaults.headers.common["Authorization"] =
//           "JWT " + res.data.accessToken;
//         originalRequest.headers["Authorization"] =
//           "JWT " + res.data.accessToken;
//         return privTisiniApi(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
function getWebSocketAddress(url: string): string {
  const pattern = /(http|https):\/\/([^\/]+)/gi;
  // const prodRegex = new RegExp(/(http|https):\/\/([^\/]+)/);
  // const pattern = isDev ? devRegex : prodRegex;
  const match = url?.match(pattern);
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
export { pubTisiniApi, privTisiniApi };
//   export default privTisiniApi;

export const wsURL = getWebSocketAddress(BASE_URL!);

export const apiService = {};

export { BASE_URL };
