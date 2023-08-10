import { NextRequest, NextResponse } from "next/server";
import QuestionSetModel from "@/app/api/models/questionset";
import { apiPaginator } from "@/app/api/utils/paginator";
import { TisiniServerException } from "@/app/api/utils/TisiniServerException";
// import dbConnect from "@/app/api/mongodb";
import validMongoId from "@/app/api/utils/mongo-id-validator";
import { HttpStatus } from "@/app/api/utils/http-status.types";
export async function GET(req: NextRequest, res: Response) {
  try {
    // await dbConnect();
    const questionSetId = req.url.slice(req.url.lastIndexOf("/") + 1);
    if (!validMongoId(questionSetId)) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Invalid question set id"],
        {},
        "Invalid question set id"
      );
    }

    const questionSet = await QuestionSetModel.findById(questionSetId);
    if (!questionSet) {
      throw new TisiniServerException(
        HttpStatus.NOT_FOUND,
        ["Question set not found"],
        {},
        "Question set not found"
      );
    }
    return NextResponse.json(questionSet, { status: HttpStatus.OK });
  } catch (error: any) {
    if (error instanceof TisiniServerException) {
      return NextResponse.json(error, { status: error.statusCode ?? 500 });
    }
    const err = TisiniServerException.fromError(error);
    return NextResponse.json(err, { status: err.statusCode ?? 500 });
  }
}
