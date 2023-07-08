import { NextRequest, NextResponse } from "next/server";
import {UserRoleModel} from "@/app/api/models/roles";
import { apiPaginator } from "@/app/api/utils/paginator";
export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = parseInt(page) ?? 1;
    const limitInt = parseInt(limit) ?? 20;
    const roles = await UserRoleModel.find({})
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);
    const totalDocs =
      (await UserRoleModel.countDocuments()) as unknown as number;

    return roles.length > 0
      ? NextResponse.json(roles)
      : NextResponse.json(
          apiPaginator({
            data: roles,
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
