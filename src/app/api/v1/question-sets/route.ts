import { NextRequest, NextResponse } from "next/server";
import QuestionSetModel from "@/app/api/models/questionset";
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
    const questionSets = await QuestionSetModel.find({});
    const totalDocs =
      (await QuestionSetModel.countDocuments()) as unknown as number;

    return questionSets.length > 0
      ? NextResponse.json(
          apiPaginator({
            data: questionSets,
            page: pageInt,
            limit: limitInt,
            totalDocs,
          })
        )
      : NextResponse.json(
          {
            message: "No question sets found",
          },
          { status: 404 }
        );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
