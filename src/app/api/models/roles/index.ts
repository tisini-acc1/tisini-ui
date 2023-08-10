import mongoose from "@/app/api/mongodb";
import {
  RoleInterface,
  RoleDocument,
  RoleModelInterface,
} from "./roles.interfaces";

const RoleSchema = new mongoose.Schema<RoleDocument, RoleModelInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Role = mongoose.model("Role", RoleSchema);
export default Role;
// mongoose.models.Role ||mongoose.model<RoleDocument, RoleModelInterface>("Role", RoleSchema);
