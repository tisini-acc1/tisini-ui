interface CookieOptions {
    expires?: Date | number;
    path?: string;
    domain?: string;
    secure?: boolean;
  }
  
  export type CookieKeys =
    | "ts-ka-369340a21d88d03d9509"
    | "ts-user-c1d2625da1e943284683";
  
  
  class Cookie {
    static set<Key,Value>(name: Key, value: Value, options: CookieOptions = {}): void {
      const serializedValue = encodeURIComponent(JSON.stringify(value));
      const cookie = `${name}=${serializedValue}`;
  
      let expires = options.expires;
      if (expires instanceof Date) {
        expires = expires.toUTCString() as any;
      } else if (typeof expires === "number") {
        const d = new Date();
        d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
        expires = d.toUTCString() as any;
      }
  
      const path = options.path ? `;path=${options.path}` : "";
      const domain = options.domain ? `;domain=${options.domain}` : "";
      const secure = options.secure ? ";secure" : "";
  
      if (expires) {
        expires = new Date(expires);
        document.cookie = `${cookie};expires=${expires.toUTCString()}${path}${domain}${secure}`;
      } else {
        document.cookie = `${cookie}${path}${domain}${secure}`;
      }
    }
  
    static get<T,P>(name: string): P | null {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name as T}=`)) {
          const value = cookie.substring(name.length + 1);
          try {
            return JSON.parse(decodeURIComponent(value)) as P;
          } catch (e) {
            return null;
          }
        }
      }
      return null;
    }
  }
  
  type TokenType = {
    accessToken: string;
    refreshToken: string;
  };
  export const setCookieToken = (token: TokenType) => {
    Cookie.set<CookieKeys, TokenType>("ts-ka-369340a21d88d03d9509", token);
  };
  type GetCookieFunction<T, P> = (key: T) => P;
  
  export const getCookieToken: GetCookieFunction<CookieKeys, TokenType> = (key) => {
    return Cookie.get<CookieKeys, TokenType>(key) as TokenType;
  };
  
  export const removeToken = (key: CookieKeys) => {
    Cookie.set<CookieKeys, TokenType>(key, {} as TokenType);
  };
  
  export default Cookie;