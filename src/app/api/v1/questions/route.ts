import { NextRequest, NextResponse } from "next/server";
import QuestionModel from "@/app/api/models/questions";
import { apiPaginator } from "@/app/api/utils/paginator";
import { HttpStatus } from "../../utils/http-status.types";
import { TisiniServerException } from "../../utils/TisiniServerException";
export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = Object.fromEntries(searchParams.entries()) as {
      page: string;
      limit: string;
    };
    const pageInt = page ? parseInt(page) : 1;
    const limitInt = limit ? parseInt(limit) : 20;
    const questions = await QuestionModel.find({})
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);
    const totalDocs =
      (await QuestionModel.countDocuments()) as unknown as number;
    const response = apiPaginator({
      data: questions,
      page: pageInt,
      limit: limitInt,
      totalDocs,
    });
    return questions.length > 0
      ? NextResponse.json(response)
      : NextResponse.json(
          {
            message: "No questions found",
            data: [],
          },
          { status: 404 }
        );
  } catch (error: any) {
    if (error instanceof TisiniServerException) {
      return NextResponse.json(error, {
        status: error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const err = TisiniServerException.fromError(error);
    return NextResponse.json(err, {
      status: err.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
