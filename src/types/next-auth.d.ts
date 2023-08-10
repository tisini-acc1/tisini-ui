// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { UserInterface } from "@/app/api/models/user/user.interfaces";
import type { Session,User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  type IUser = UserInterface & DefaultUser;
  interface Session extends IUser {}
}

declare module "next-auth/jwt" {
  type JWT = DefaultJWT & {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
  } & UserInterface;
}
