import { NextResponse, NextRequest } from "next/server";
import OrganizationModel from "@/app/api/models/organization";
import { apiPaginator } from "@/app/api/utils/paginator";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const organizations = await OrganizationModel.find({});
    const totalDocs =
      (await OrganizationModel.countDocuments()) as unknown as number;
    const response = apiPaginator({
      data: organizations,
      page: pageInt,
      limit: limitInt,
      totalDocs,
    });
    return organizations.length > 0
      ? NextResponse.json(response)
      : NextResponse.json(response, { status: 404 });
  } catch (error) {}
}
