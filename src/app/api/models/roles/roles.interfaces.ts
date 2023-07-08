import mongoose from "@/app/api/mongodb";

export interface UserRoleInterface {
  name: string;
  roleName: string;
  description: string;
  isDefault?: boolean;
}

export interface UserRoleDocument extends UserRoleInterface, mongoose.Document {
  _id: any;
  _doc: UserRoleInterface;
}

export interface UserRoleModelInterface
  extends mongoose.Model<UserRoleDocument> {
  build(attr: UserRoleInterface): UserRoleDocument;
  InitBaseRoles(): Promise<void>;
  findDefaultRole(): Promise<UserRoleDocument>;
}
