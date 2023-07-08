import mongoose from "@/app/api/mongodb";
import {
  UserRoleInterface,
  UserRoleDocument,
  UserRoleModelInterface,
} from "./roles.interfaces";

const userRoleSchema = new mongoose.Schema<UserRoleDocument>(
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

userRoleSchema.statics.build = (attr: UserRoleInterface) => {
  return new UserRoleModel(attr);
};

userRoleSchema.statics.InitBaseRoles = async function () {
  const roles = [
    {
      name: "Administrator",
      roleName: "ADMIN",
      description: "Administrator role",
      isDefault: false,
    },
    {
      name: "User",
      roleName: "USER",
      description: "User role",
      isDefault: true,
    },
    {
      name: "Quiz Admin",
      roleName: "QUIZ_ADMIN",
      description: "Quiz Admin role",
      isDefault: false,
    },
  ];
  for (const role of roles) {
    try {
      const existingRole = await UserRoleModel.findOne({
        roleName: role.roleName,
      });
      if (!existingRole) {
        await UserRoleModel.create(role);
      }
      await UserRoleModel.findOneAndUpdate({ roleName: role.roleName }, role, {
        upsert: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

userRoleSchema.statics.findDefaultRole = async function () {
  const defaultRole = await UserRoleModel.findOne({ isDefault: true });
  if (!defaultRole) {
    await UserRoleModel.InitBaseRoles();
    return await UserRoleModel.findOne({ isDefault: true });
  }
  return defaultRole;
};

const UserRoleModel :mongoose.Model<UserRoleModelInterface> =
    mongoose.models.UserRole ||
  mongoose.model<UserRoleDocument, UserRoleModelInterface>(
    "UserRole",
    userRoleSchema
  );

export { UserRoleModel}
