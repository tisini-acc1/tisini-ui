import { HttpStatus } from "../../utils/http-status.types";
import { TisiniServerException } from "../../utils/TisiniServerException";
import TisiniValidator from "@/lib/tisini-validator";
import { UserInterface } from "@/app/api/models/user/user.interfaces";

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
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Phone number is required"],
        {},
        "Phone number is required"
      );
    }
    if (!data.password) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Password is required"],
        {},
        "Password is required"
      );
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
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Email is required"],
        {},
        "Email is required"
      );
    }
    if (!data.password) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Password is required"],
        {},
        "Password is required"
      );
    }
    if (!data.nickname) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Nickname is required"],
        {},
        "Nickname is required"
      );
    }
    if (!data.first_name) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["First name is required"],
        {},
        "First name is required"
      );
    }
    if (!data.last_name) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Last name is required"],
        {},
        "Last name is required"
      );
    }
    if (!data.phone_number) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Phone number is required"],
        {},
        "Phone number is required"
      );
    }
    if (!data.roles) {
      data.roles = [];
    }
    if (data.password.length < 6) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Password must be at least 6 characters"],
        {},
        "Password must be at least 6 characters"
      );
    }
    if (TisiniValidator.phoneRegex.test(data.phone_number) === false) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Invalid phone number"],
        {},
        "Invalid phone number"
      );
    }
    return new UserSignUpDto(data).user;
  }
}

export { UserSignUpDto, UserLoginDto };
