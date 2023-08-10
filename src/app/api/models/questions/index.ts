import mongoose from "@/app/api/mongodb";
import {
  QuestionInterface,
  QuestionDocumentInterface,
  QuestionModelInterface,
} from "@/app/api/models/questions/questions.interfaces";

const QuestionSchema = new mongoose.Schema<QuestionDocumentInterface>(
  {
    type: {
      type: String,
      required: [true, "Please provide a question type"],
      trim: true,
    },
    question: {
      type: String,
      required: [true, "Please provide a question"],
      trim: true,
    },
    question_image: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    question_video: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    answers: {
      type: [mongoose.Schema.Types.ObjectId],
      trim: true,
      ref: "QuestionAnswer",
      default: [],
    },
    points: {
      type: Number,
      required: [true, "Please provide a question points"],
      trim: true,
    },

    question_set: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionSet",
      required: [true, "Please provide a question set"],
      trim: true,
    },
    timer: {
      type: Number,
      required: [true, "Please provide a question timer"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

QuestionSchema.statics.build = (attr: QuestionInterface) => {
  return new QuestionModel(attr);
};

const QuestionModel =
  mongoose.models.Question ||
  mongoose.model<QuestionDocumentInterface, QuestionModelInterface>(
    "Question",
    QuestionSchema
  );

export default QuestionModel;
