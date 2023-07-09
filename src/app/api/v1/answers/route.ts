import { NextRequest, NextResponse } from "next/server";
import AnswerModel from "@/app/api/models/question-answers";
import { apiPaginator } from "@/app/api/utils/paginator";
import { TisiniServerException } from "../../utils/TisiniServerException";
import { HttpStatus } from "../../utils/http-status.types";
export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = page ? parseInt(page) : 1;
    const limitInt = limit ? parseInt(limit) : 10;
    const answers = await AnswerModel.find({})
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);
    const totalDocs = (await AnswerModel.countDocuments()) as unknown as number;
    const response = apiPaginator({
      data: answers,
      page: pageInt,
      limit: limitInt,
      totalDocs,
    });
    return answers.length > 0
      ? NextResponse.json(response, { status: HttpStatus.OK })
      : NextResponse.json(
          {
            message: "No answers found",
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
