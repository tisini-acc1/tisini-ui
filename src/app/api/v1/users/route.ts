import { NextRequest, NextResponse } from "next/server";
import  UserModel  from "@/app/api/models/user";
import { apiPaginator } from "@/app/api/utils/paginator";
export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const users = await UserModel.find({});
    const totalDocs = (await UserModel.countDocuments()) as unknown as number;

    return users.length > 0
      ? NextResponse.json(users)
      : NextResponse.json(
          apiPaginator({
            data: users,
            page: pageInt,
            limit: limitInt,
            totalDocs,
          }),
          { status: 404 }
        );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
