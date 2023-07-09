import {
  UserDocumentInterface,
  UserDocumentModelInterface,
  UserInterface,
} from "./user.interfaces";
import mongoose from "mongoose";
import PasswordHandler from "@/app/api/utils/Password.service";

const UserSchema = new mongoose.Schema<UserDocumentInterface>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
      
      unique: true,
    },
    nickname: {
      type: String,
      required: [true, "Please provide a nickname"],
      trim: true,
      
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
      
    },
    last_name: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
      
    },
    roles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Role",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<UserDocumentInterface, UserDocumentModelInterface>(
    "User",
    UserSchema
  );
