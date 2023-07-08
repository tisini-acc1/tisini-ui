import mongoose from "@/app/api/mongodb";

export interface QuestionTypeInterface {}

export interface QuestionInterface {
  type: QuestionTypeInterface;
  answers: any[];
  question: string;
  question_image?: string;
  question_video?: string;
  points: number;
  timer: number;
  question_set: any;
}

export interface QuestionDocumentInterface
  extends QuestionInterface,
    mongoose.Document {
  _id: any;
  _doc: QuestionInterface;
}

export interface QuestionModelInterface
  extends mongoose.Model<QuestionDocumentInterface> {
  build(attr: QuestionInterface): QuestionDocumentInterface;
}
