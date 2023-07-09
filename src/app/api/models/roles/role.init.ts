import Roles from ".";
import dbConnect from "../../mongodb";
import { RoleInterface } from "./roles.interfaces";

export default async function initRoles() {
  class Role {
    constructor(attr: RoleInterface) {
      Object.assign(this, attr);
    }
  }
  await dbConnect();
  const roles = [
    {
      name: "Administrator",
      roleName: "ADMIN",
      description: "Administrator role",
      isDefault: false,
    },
    {
      name: "user",
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
      const existingRole = await Roles.findOne({
        roleName: role.roleName,
      });
      if (!existingRole) {
        console.log("Creating role");

        await Roles.create(new Role(role));
      }
      await Roles.findOneAndUpdate({ roleName: role.roleName }, role, {
        upsert: true,
      });
    } catch (error) {
      console.log("Error creating role");

      console.log(error);
    }
  }
}
