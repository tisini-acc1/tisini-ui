import { NextRequest, NextResponse } from "next/server";
import QuestionModel from "@/app/api/models/questions";
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
    const questions = await QuestionModel.find({});
    const totalDocs =
      (await QuestionModel.countDocuments()) as unknown as number;

    return questions.length > 0
      ? NextResponse.json(
          apiPaginator({
            data: questions,
            page: pageInt,
            limit: limitInt,
            totalDocs,
          })
        )
      : NextResponse.json(
          {
            message: "No questions found",
          },
          { status: 404 }
        );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
