import { NextRequest, NextResponse } from "next/server";
import  RoleModel  from "@/app/api/models/roles";
import { apiPaginator } from "@/app/api/utils/paginator";
export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = page ? parseInt(page) : 1;
    const limitInt = limit ? parseInt(limit) : 20;
    const roles = await RoleModel.find({})
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);
    const totalDocs =
      (await RoleModel.countDocuments()) as unknown as number;

    return roles.length > 0
      ? NextResponse.json(
          apiPaginator({
            data: roles,
            page: pageInt,
            limit: limitInt,
            totalDocs,
          })
        )
      : NextResponse.json(
          {
            message: "No roles found",
          },

          { status: 404 }
        );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
