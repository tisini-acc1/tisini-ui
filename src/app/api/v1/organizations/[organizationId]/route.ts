import { NextRequest, NextResponse } from "next/server";
import OrganizationModel from "@/app/api/models/organization";
import { TisiniServerException } from "@/app/api/utils/TisiniServerException";
// import dbConnect from "@/app/api/mongodb";
import validMongoId from "@/app/api/utils/mongo-id-validator";
import { HttpStatus } from "@/app/api/utils/http-status.types";
export async function GET(req: NextRequest, res: Response) {
  try {
    // await dbConnect();
    const organizationId = req.url.slice(req.url.lastIndexOf("/") + 1);
    if (!validMongoId(organizationId)) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Invalid organization id"],
        {},
        "Invalid organization id"
      );
    }

    const questionSet = await OrganizationModel.findById(organizationId);
    if (!questionSet) {
      throw new TisiniServerException(
        HttpStatus.NOT_FOUND,
        ["organization not found"],
        {},
        "organization not found"
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
