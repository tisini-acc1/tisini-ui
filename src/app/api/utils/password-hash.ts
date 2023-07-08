import bcrypt from "bcryptjs";

class PasswordHandler {
  public static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  public static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  public static generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  public static generaMd5Hash(text: string): string {
    return bcrypt.hashSync(text, 10);
  }
}

export default PasswordHandler;