import mongoose from "mongoose";

export interface RoleInterface {
  name: string;
  roleName: string;
  description: string;
  isDefault?: boolean;
}

export interface RoleDocument extends RoleInterface, mongoose.Document {
  _doc: RoleInterface;
}

export interface RoleModelInterface
  extends mongoose.Model<RoleDocument> {
  build(attr: RoleInterface): RoleDocument;
}
