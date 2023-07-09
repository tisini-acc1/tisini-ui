import bcrypt from "bcryptjs";
import { createHash } from "crypto";
export default class PasswordHandler {
  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const text = await bcrypt.hash(password, salt);
    return text;
  }

  public static async comparePassword(password: string, hash: string) {
    const match = await bcrypt.compare(password, hash);
    return match;
  }
  public static validatePassword(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (password.search(/[a-z]/) < 0) {
      errors.push("Password must contain lowercase letters");
    }
    if (password.search(/[A-Z]/) < 0) {
      errors.push("Password must contain uppercase letters");
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push("Password must contain at least one digit");
    }
    if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
      errors.push("Password must contain at least one special character");
    }
    if (errors.length > 0) {
      return { valid: false, errors };
    }
    return { valid: true, errors: [] };
  }

  public static md5Avatar(email: string) {
    const addAvatarHash = (h: string) =>
      `https://gravatar.com/avatar/${h}?d=mp`;
    // const gravatarUrl =
    //   'https://gravatar.com/avatar/0842f50b079f15078d6fa27413f129f5?d=mp';
    const md5 = createHash("md5").update(email).digest("hex").toLowerCase();
    return addAvatarHash(md5);
  }
}
