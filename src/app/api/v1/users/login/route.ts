import { NextResponse } from "next/server";
import { UserLoginDto } from "../../dtos/create-user.dto";
import UserModel from "@/app/api/models/user";
import PasswordHandler from "@/app/api/utils/password-hash";
export async function POST(req: Request, res: Response) {
  try {
    const payload = await req.json();
    const newUserPayload = UserLoginDto.validateLogin(payload);
    const user = await UserModel.findOne({
      phone_number: newUserPayload.phone_number,
    }).select("+password").populate("roles");
    console.log(user);
    
    if (!user) throw new Error("User account does not exist");
    const passwordMatch = PasswordHandler.comparePassword(
      newUserPayload.password,
      user.password
    );
    console.log({passwordMatch});
    
    if (!passwordMatch) throw new Error("Invalid login credentials");

    return NextResponse.json(
      {
        message: "Login successful",
        user: user,
      },
      { status: 200, statusText: "Success" }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
