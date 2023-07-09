import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/api/models/user";
import { apiPaginator } from "@/app/api/utils/paginator";
import dbConnect from "../../mongodb";
import { HttpStatus } from "../../utils/http-status.types";
import { TisiniServerException } from "../../utils/TisiniServerException";
export async function GET(req: NextRequest, res: Response) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = page ? parseInt(page) : 1;
    const limitInt = limit ? parseInt(limit) : 20;
    const users = await UserModel.find({})
      .populate("roles", "name roleName -_id")
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);
    const totalDocs = (await UserModel.countDocuments()) as unknown as number;

    return users.length > 0
      ? NextResponse.json(
          apiPaginator({
            data: users,
            page: pageInt,
            limit: limitInt,
            totalDocs,
          })
        )
      : NextResponse.json({ message: "No users found" }, { status: 404 });
  } catch (error: any) {
    if (error instanceof TisiniServerException) {
      return NextResponse.json(error, {
        status: error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const err = TisiniServerException.fromError(error);
    return NextResponse.json(err, {
      status: err.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
