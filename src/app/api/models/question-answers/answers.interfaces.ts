import mongoose from "@/app/api/mongodb";
export interface QuestionAnswerInterface {
  question: any;
  answer: any;
  is_correct: boolean;
}

export interface QuestionAnswerDocumentInterface
  extends QuestionAnswerInterface,
    mongoose.Document {
  _id: any;
  _doc: QuestionAnswerInterface;
}

export interface QuestionAnswerModelInterface
  extends mongoose.Model<QuestionAnswerDocumentInterface> {
  build(attr: QuestionAnswerInterface): QuestionAnswerDocumentInterface;
}
