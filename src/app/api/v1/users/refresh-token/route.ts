import { JWTService } from "@/app/api/utils/JWT.service";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/api/models/user";

export async function POST(req: NextRequest, res: NextResponse) {
  //   const refreshToken = async (refreshToken: string) => {
  //     try {
  //       if (!refreshToken) {
  //         throw new Error("Refresh token not provided");
  //       }
  //       const decoded = JWTService.verifyRefreshToken(refreshToken);
  //       const user = await UserModel.findById(decoded.id);
  //       if (!user) {
  //         throw new Error("User not found");
  //       }
  //       const acToken = JWTService.generateAccessToken({
  //         id: user._id,
  //         email: user.email,
  //       });
  //       const rfToken = JWTService.generateRefreshToken({
  //         id: user._id,
  //         email: user.username,
  //       });

  //       return { accessToken: acToken, refreshToken: rfToken };
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   };
  try {
    const body = await req.json();
    if (!Object.keys(body).includes("refreshToken")) {
      throw new Error("Refresh token not provided");
    }
    const { refreshToken: rfToken } = body;
    const decoded = JWTService.verifyRefreshToken(rfToken);

    const existingUser = await UserModel.findById(decoded.id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const tokens = {
      accessToken: JWTService.generateAccessToken({
        id: existingUser._id,
        email: existingUser.email,
      }),
      refreshToken: JWTService.generateRefreshToken({
        id: existingUser._id,
        email: existingUser.email,
      }),
    };

    return NextResponse.json(
      {
        message: "Token refreshed successfully",
        tokens,
      },
      { status: 200, statusText: "Success" }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
