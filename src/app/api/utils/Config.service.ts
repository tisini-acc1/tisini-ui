interface ConfigKeysInterface {
  MONGO_URI: string;
  PORT: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_RESET_PASSWORD_TOKEN_SECRET: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL_INTERNAL: string;
}

type ConfigKeys = keyof ConfigKeysInterface; // | keyof NodeJS.ProcessEnv

class ConfigService {
  private readonly envConfig: ConfigKeysInterface;
  constructor() {
    const config = process.env;
    this.envConfig = config as unknown as ConfigKeysInterface;
  }
  public getKey(key: ConfigKeys): string {
    const val = this.envConfig[key];
    if (!val) {
      throw new Error(
        `Config Error: ${key} is not defined, please check your .env file`
      );
    }
    return val;
  }
}

const configService = new ConfigService();

export default configService;
