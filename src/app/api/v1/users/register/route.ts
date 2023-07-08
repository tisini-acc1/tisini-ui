import { NextResponse } from "next/server";
import { UserSignUpDto } from "../../dtos/create-user.dto";
import validMongoId from "@/app/api/utils/mongo-id-validator";
import { UserRoleModel } from "@/app/api/models/roles";
import UserModel from "@/app/api/models/user";
import PasswordHandler from "@/app/api/utils/password-hash";
export async function POST(req: Request, res: Response) {
  try {
    const payload = await req.json();
    const newUserPayload = UserSignUpDto.validateRegistration(payload);
    const roles = newUserPayload.roles;
    if (roles.length !== 0) {
      roles.forEach(async (role) => {
        if (!validMongoId(role)) throw new Error("Invalid role id");
        const existingRole = await UserRoleModel.findById(role);
        if (!existingRole) throw new Error("Role does not exist");
      });
    }
    const existingUser = await UserModel.findOne({
      $or: [
        { email: newUserPayload.email },
        { phone_number: newUserPayload.phone_number },
      ],
    });
    if (existingUser && existingUser.email === newUserPayload.email)
      throw new Error("Email already exists");
    if (
      existingUser &&
      existingUser.phone_number === newUserPayload.phone_number
    )
      throw new Error("Phone number already exists");

    const defaultRole = await UserRoleModel.findDefaultRole();

    const newUser = await UserModel.create({
      ...newUserPayload,
      roles: roles.length === 0 ? [defaultRole._id] : roles,
      password: PasswordHandler.hashPassword(newUserPayload.password),
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201, statusText: "Created" }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
