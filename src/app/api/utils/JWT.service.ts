import jwt from "jsonwebtoken";
import ConfigService from "./Config.service";

type User = {
  email: string;
  id: string;
};
type ResetPasswordPayload = {
  email: string;
  userId: string;
};

export class JWTService {
  static generateAccessToken(user: User) {
    const secretKey = ConfigService.getKey("JWT_ACCESS_TOKEN_SECRET");
    const accessToken = jwt.sign(user, secretKey!, {
      expiresIn: ConfigService.getKey("JWT_ACCESS_TOKEN_EXPIRES_IN"),
    });

    return accessToken;
  }

  static generateRefreshToken(user: User) {
    const secretKey = ConfigService.getKey("JWT_REFRESH_SECRET");
    const refreshToken = jwt.sign(user, secretKey!, {
      expiresIn: ConfigService.getKey("JWT_REFRESH_EXPIRES_IN"),
    });
    return refreshToken;
  }

  static verifyAccessToken(token: string): User {
    try {
      const secretKey = ConfigService.getKey("JWT_ACCESS_TOKEN_SECRET");
      const user = jwt.verify(token, secretKey!) as User;
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  static verifyRefreshToken(token: string): User {
    try {
      const secretKey = ConfigService.getKey("JWT_REFRESH_SECRET");
      const user = jwt.verify(token, secretKey!) as User;
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
  static generateResetPasswordToken(email: string, userId: string) {
    const secretKey = ConfigService.getKey("JWT_RESET_PASSWORD_TOKEN_SECRET");
    const token = jwt.sign({ email, userId }, secretKey!, {
      expiresIn: "1h",
    });
    return token;
  }
  static verifyResetPasswordToken(token: string) {
    try {
      const secretKey = ConfigService.getKey("JWT_RESET_PASSWORD_TOKEN_SECRET");
      const user = jwt.verify(token, secretKey!) as ResetPasswordPayload;
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
