import authOptions from "../auth/authOptions";
import { getServerSession } from "next-auth";

export default async function getAuthSession<T = any>() {
  const session = await getServerSession(authOptions);
  return session as T;
}