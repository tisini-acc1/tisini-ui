import { NextResponse } from "next/server";
import { UserSignUpDto } from "../../dtos/create-user.dto";
import validMongoId from "@/app/api/utils/mongo-id-validator";
import RoleModel from "@/app/api/models/roles";
import UserModel from "@/app/api/models/user";
import PasswordHandler from "@/app/api/utils/Password.service";
import dbConnect from "@/app/api/mongodb";
import initRoles from "@/app/api/models/roles/role.init";
import bcrypt from "bcryptjs";
export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();
    const payload = UserSignUpDto.validateRegistration(await req.json());
    const roles = payload.roles;
    if (roles.length !== 0) {
      roles.forEach(async (role) => {
        if (!validMongoId(role)) throw new Error("Invalid role id");
        const existingRole = await RoleModel.findById(role);
        if (!existingRole) throw new Error("Role does not exist");
      });
    }
    const existingUser = await UserModel.findOne({
      $or: [{ email: payload.email }, { phone_number: payload.phone_number }],
    });
    if (existingUser && existingUser.email === payload.email)
      throw new Error("Email already exists");
    if (existingUser && existingUser.phone_number === payload.phone_number)
      throw new Error("Phone number already exists");

    let defaultRole = await RoleModel.findOne({ isDefault: true });
    if (!defaultRole) {
      await initRoles();
      defaultRole = await RoleModel.findOne({ isDefault: true });
    }
    payload.password = await bcrypt.hash(
      payload.password,
      await bcrypt.genSalt(10)
    );
    const newUser = await UserModel.create({
      ...payload,
      roles: roles.length === 0 ? [defaultRole._id] : roles,
      avatar:PasswordHandler.md5Avatar(payload.email)
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
