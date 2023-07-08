import { Model } from "mongoose";
import { UserDocumentInterface, UserDocumentModelInterface, UserInterface } from "./user.interfaces";
import mongoose from"@/app/api/mongodb";

const UserSchema = new mongoose.Schema<UserDocumentInterface>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      select: false,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    nickname: {
      type: String,
      required: [true, "Please provide a nickname"],
      trim: true,
      lowercase: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    last_name: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
      lowercase: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.build = (attr: UserInterface) => {
  return new UserModel(attr);
};

const UserModel :Model<UserDocumentInterface> =
  mongoose.models.User ||
  mongoose.model<UserDocumentInterface, UserDocumentModelInterface>("User", UserSchema);

export default UserModel;
