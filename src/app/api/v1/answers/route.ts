import { NextRequest, NextResponse } from "next/server";
import AnswerModel from "@/app/api/models/question-answers";
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
    const answers = await AnswerModel.find({});
    const totalDocs = (await AnswerModel.countDocuments()) as unknown as number;

    return answers.length > 0
      ? NextResponse.json(answers)
      : NextResponse.json(
          apiPaginator({
            data: answers,
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
