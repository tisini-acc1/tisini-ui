import mongoose from "mongoose";

export interface QuestionSetInterface {
  category_name: string; // Category name with a max length of 300 and min length of 1
  // play_date: string; // Play date-time
  start_datetime: Date; // Start time
  end_datetime: Date; // End time
  status: "PL" | "NP"; // PL - Played, NP - Not Played
  is_payable: "PA" | "NP"; // PA - Payable, NP - Not Payable
  amount_payable: number; // Amount payable
  prize_won: string; // Prize won
  questions: any[]; // Array of Question objects,
  theme_image: string; // Theme image
  organization: any;
}

export interface QuestionSetDocumentInterface
  extends QuestionSetInterface,
    mongoose.Document {
  _id: any;
  _doc: QuestionSetInterface;
}

export interface QuestionSetModelInterface
  extends mongoose.Model<QuestionSetDocumentInterface> {
  build(attr: QuestionSetInterface): QuestionSetDocumentInterface;
}
