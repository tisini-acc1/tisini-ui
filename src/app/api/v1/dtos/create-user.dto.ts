import { UserInterface } from "@/app/api/models/user/user.interfaces";
import TisiniValidator from "@/utils/tisini-validator";

class UserLoginDto {
  constructor(
    private _user: Pick<UserInterface, "phone_number" | "password">
  ) {}

  get user() {
    return this._user;
  }
  public static validateLogin(
    data: Pick<UserInterface, "phone_number" | "password">
  ) {
    if (!data.phone_number) {
      throw new Error("Email is required");
    }
    if (!data.password) {
      throw new Error("Password is required");
    }
    return new UserLoginDto(data).user;
  }
}

class UserSignUpDto {
  constructor(private _user: UserInterface) {}

  get user() {
    return this._user;
  }

  public static validateRegistration(data: UserInterface) {
    if (!data.email) {
      throw new Error("Email is required");
    }
    if (!data.password) {
      throw new Error("Password is required");
    }
    if (!data.nickname) {
      throw new Error("Nickname is required");
    }
    if (!data.first_name) {
      throw new Error("First name is required");
    }
    if (!data.last_name) {
      throw new Error("Last name is required");
    }
    if (!data.phone_number) {
      throw new Error("Phone number is required");
    }
    if (!data.roles) {
      data.roles = [];
    }
    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (TisiniValidator.validPhone(data.phone_number) === false) {
      throw new Error("Phone number is invalid");
    }

    return new UserSignUpDto(data).user;
  }
}

export { UserSignUpDto, UserLoginDto };