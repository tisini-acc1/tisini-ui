import { NextResponse } from "next/server";
import { UserLoginDto } from "../../dtos/create-user.dto";
import UserModel from "@/app/api/models/user";
import dbConnect from "@/app/api/mongodb";
import PasswordHandler from "@/app/api/utils/Password.service";
import bcrypt from "bcryptjs";
import { JWTService } from "@/app/api/utils/JWT.service";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();
    const payload = UserLoginDto.validateLogin(await req.json());
    const existingUser = await UserModel.findOne({
      phone_number: payload.phone_number,
    });
    if (!existingUser) throw new Error("User account does not exist");
    const user = await UserModel.findOne({
      phone_number: payload.phone_number,
    })
      .select("+password")
      .populate("roles", "name roleName");

    if (
      !(await PasswordHandler.comparePassword(payload.password, user.password))
    )
      throw new Error("Invalid login credentials");

    const accessToken = JWTService.generateAccessToken({
      email: user.email,
      id: user._id,
    });
    const refreshToken = JWTService.generateRefreshToken({
      email: user.email,
      id: user._id,
    });
    const { password: _, ...rest } = user._doc;

    return NextResponse.json(
      {
        message: "Login successful",
        profile: rest,
        tokens: { accessToken, refreshToken },
      },
      { status: 200, statusText: "Success" }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
