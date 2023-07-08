import mongoose from "@/app/api/mongodb";

import {
  QuestionAnswerDocumentInterface,
  QuestionAnswerModelInterface,
} from "@/app/api/models/question-answers/answers.interfaces";

const QuestionAnswerSchema =
  new mongoose.Schema<QuestionAnswerDocumentInterface>(
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: [true, "Please provide a question"],
        trim: true,
      },
      answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: [true, "Please provide an answer"],
        trim: true,
      },
      is_correct: {
        type: Boolean,
        required: [true, "Please provide a correct answer"],
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

QuestionAnswerSchema.statics.build = (
  attr: QuestionAnswerDocumentInterface
) => {
  return new QuestionAnswerModel(attr);
};

const QuestionAnswerModel =
  mongoose.models.QuestionAnswer ||
  mongoose.model<QuestionAnswerDocumentInterface, QuestionAnswerModelInterface>(
    "QuestionAnswer",
    QuestionAnswerSchema
  );

export default QuestionAnswerModel;
