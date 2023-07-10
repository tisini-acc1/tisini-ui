import OrganizationModel from "../../models/organization";
import QuestionModel from "../../models/questions";
import { QuestionSetInterface } from "../../models/questionset/questionset.interfaces";
import dbConnect from "../../mongodb";
import { TisiniServerException } from "../../utils/TisiniServerException";
import { HttpStatus } from "../../utils/http-status.types";
import validMongoId from "../../utils/mongo-id-validator";
import moment from "moment";

export class CreateQuestionSetDto {
  constructor(private _questionSet: QuestionSetInterface) {}

  get questionSet() {
    return this._questionSet;
  }

  public static async fromJson(data: QuestionSetInterface) {
    if (!data.category_name) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Question set category name is required"],
        { key: "category_name" },
        "Question set category name is required"
      );
    }
    if (!data.amount_payable) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Question set amount payable is required"],
        { key: "amount_payable" },
        "Question set amount payable is required"
      );
    }
    if (data.questions.length > 0) {
      await dbConnect();
      for (const question of data.questions) {
        if (!validMongoId(question)) {
          throw new TisiniServerException(
            HttpStatus.BAD_REQUEST,
            ["Invalid question id"],
            { key: "questions" },
            "Invalid question id"
          );
        }
        const questionExists = await QuestionModel.findById(question);
        if (!questionExists) {
          throw new TisiniServerException(
            HttpStatus.NOT_FOUND,
            ["Question not found"],
            { key: "questions" },
            "Question not found"
          );
        }
      }
    }
    if (data.theme_image && typeof data.theme_image !== "string") {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Theme image must be a string"],
        { key: "theme_image" },
        "Theme image must be a string"
      );
    }
    if (!data.organization) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Organization is required"],
        { key: "organization" },
        "Organization is required"
      );
    }
    if (data.organization) {
      if (!validMongoId(data.organization)) {
        throw new TisiniServerException(
          HttpStatus.BAD_REQUEST,
          ["Invalid organization id"],
          { key: "organization" },
          "Invalid organization id"
        );
      }

      await dbConnect();
      const organizationExists = await OrganizationModel.findById(
        data.organization
      );
      if (!organizationExists) {
        throw new TisiniServerException(
          HttpStatus.NOT_FOUND,
          ["Organization not found"],
          { key: "organization" },
          "Organization not found"
        );
      }
    }
    if (!data.status) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Status is required"],
        { key: "status", options: ["PL", "NP"] },
        "Status is required"
      );
    }
    if (data.status) {
      if (!["PL", "NP"].includes(data.status)) {
        throw new TisiniServerException(
          HttpStatus.BAD_REQUEST,
          ["Invalid status"],
          { key: "status", options: ["PL", "NP"] },
          "Invalid status"
        );
      }
    }
    if (!data.start_datetime) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["Start datetime is required"],
        { key: "start_datetime" },
        "Start datetime is required"
      );
    }
    if (data.start_datetime) {
      if (!moment(data.start_datetime).isValid()) {
        throw new TisiniServerException(
          HttpStatus.BAD_REQUEST,
          ["Invalid start datetime"],
          { key: "start_datetime" },
          "Invalid start datetime"
        );
      }
    }
    if (!data.end_datetime) {
      throw new TisiniServerException(
        HttpStatus.BAD_REQUEST,
        ["End datetime is required"],
        { key: "end_datetime" },
        "End datetime is required"
      );
    }
    if (data.end_datetime) {
      if (!moment(data.end_datetime).isValid()) {
        throw new TisiniServerException(
          HttpStatus.BAD_REQUEST,
          ["Invalid end datetime"],
          { key: "end_datetime" },
          "Invalid end datetime"
        );
      }
    }
    if (data.start_datetime && data.end_datetime) {
        if (moment(data.start_datetime).isAfter(data.end_datetime)) {
            throw new TisiniServerException(
                HttpStatus.BAD_REQUEST,
                ["Start datetime cannot be after end datetime"],
                { key: "start_datetime" },
                "Start datetime cannot be after end datetime"
            );
        }
    }
    if(!data.is_payable){
        throw new TisiniServerException(
            HttpStatus.BAD_REQUEST,
            ["Is payable is required"],
            { key: "is_payable", options: ['PA', 'NP'] },
            "Is payable is required"
        );
    }
    if(data.is_payable){
        if(!['PA', 'NP'].includes(data.is_payable)){
            throw new TisiniServerException(
                HttpStatus.BAD_REQUEST,
                ["Invalid is payable"],
                { key: "is_payable", options: ['PA', 'NP'] },
                "Invalid is payable"
            );
        }
    }
    if(data.prize_won){
        if(typeof data.prize_won !== 'string'){
            throw new TisiniServerException(
                HttpStatus.BAD_REQUEST,
                ["Prize won must be a string"],
                { key: "prize_won" },
                "Prize won must be a string"
            );
        }
    }
    return new CreateQuestionSetDto(data).questionSet;
  }
}
