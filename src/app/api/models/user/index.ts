import { IUserDocument, IUserModel, IUser } from "./user.interfaces";
import mongoose from "@/app/api/mongodb";

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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

UserSchema.statics.build = (attr: IUser) => {
  return new UserModel(attr);
};

const UserModel =
  mongoose.models.User ||
  mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default UserModel;
