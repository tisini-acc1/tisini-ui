import mongoose from "@/app/api/mongodb";
export interface IUser {
  nickname: string; // Nickname with a max length of 255 and min length of 1
  email: string; // Email with a max length of 255 and min length of 1
  first_name: string | null; // Optional first name with a max length of 255
  last_name: string | null; // Optional last name with a max length of 255
  password: string; // Password with a max length of 68 and min length of 6
  phone_number: string | null; // Optional phone number with a max length of 15
  roles:any[]; 
}

export interface IUserDocument extends IUser, mongoose.Document {
  _id: any;
  _doc: IUser;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  build(attr: IUser): IUserDocument;
}
