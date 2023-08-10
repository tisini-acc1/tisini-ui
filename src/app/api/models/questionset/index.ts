import mongoose from "@/app/api/mongodb";
import {
  QuestionSetDocumentInterface,
  QuestionSetModelInterface,
} from "./questionset.interfaces";
const QuestionSetSchema = new mongoose.Schema<QuestionSetDocumentInterface>(
  {
    theme_image: {
      type: String,
      required: [true, "Please provide a theme image"],
      trim: true,
    },
    category_name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
    },
    start_datetime: {
      type: Date,
      required: [true, "Please provide a start date"],
      trim: true,
    },
    end_datetime: {
      type: Date,
      required: [true, "Please provide an end date"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Please provide a status"],
      trim: true,
    },
    is_payable: {
      type: String,
      required: [true, "Please provide a payable status"],
      trim: true,
    },
    amount_payable: {
      type: Number,
      required: [true, "Please provide an amount payable"],
      trim: true,
    },
    prize_won: {
      type: String,
      required: [true, "Please provide a prize won"],
      trim: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      trim: true,
      default: [],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please provide an organization"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

QuestionSetSchema.statics.build = (attr: QuestionSetDocumentInterface) => {
  return new QuestionSetModel(attr);
};

const QuestionSetModel =
  mongoose.models.QuestionSet ||
  mongoose.model<QuestionSetDocumentInterface, QuestionSetModelInterface>(
    "QuestionSet",
    QuestionSetSchema
  );

export default QuestionSetModel;
