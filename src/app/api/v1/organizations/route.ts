import { NextResponse, NextRequest } from "next/server";
import OrganizationModel from "@/app/api/models/organization";
import { apiPaginator } from "@/app/api/utils/paginator";
import { HttpStatus } from "../../utils/http-status.types";
import { TisiniServerException } from "../../utils/TisiniServerException";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = page ? parseInt(page) : 1;
    const limitInt = limit ? parseInt(limit) : 20;
    const organizations = await OrganizationModel.find({})
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);
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
      : NextResponse.json(
          {
            message: "No organizations found",
            data: [],
          },
          { status: HttpStatus.NOT_FOUND }
        );
  } catch (error: any) {
    if (error instanceof TisiniServerException) {
      return NextResponse.json(error, { status: error.statusCode ?? 500 });
    }
    const err = TisiniServerException.fromError(error);
    return NextResponse.json(err, { status: err.statusCode ?? 500 });
  }
}
