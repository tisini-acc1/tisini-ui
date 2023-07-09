import { NextRequest, NextResponse } from "next/server";
import QuestionSetModel from "@/app/api/models/questionset";
import { apiPaginator } from "@/app/api/utils/paginator";
import { TisiniServerException } from "../../utils/TisiniServerException";
export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const questionSets = await QuestionSetModel.find({});
    const totalDocs =
      (await QuestionSetModel.countDocuments()) as unknown as number;
    const response = apiPaginator({
      data: questionSets,
      page: pageInt,
      limit: limitInt,
      totalDocs,
    });
    return questionSets.length > 0
      ? NextResponse.json(response)
      : NextResponse.json(
          {
            message: "No question sets found",
          },
          { status: 404 }
        );
  } catch (error: any) {
    if (error instanceof TisiniServerException) {
      return NextResponse.json(error, { status: error.statusCode ?? 500 });
    }
    const err = TisiniServerException.fromError(error);
    return NextResponse.json(err, { status: err.statusCode ?? 500 });
  }
}
