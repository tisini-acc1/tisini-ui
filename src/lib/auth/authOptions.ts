import { BASE_URL, pubTisiniApi } from "../api-conf";

import { AuthOptions } from "next-auth";
import { AxiosError } from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import configService from "@/app/api/utils/config";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone_number: {
          label: "Phone Number",
          type: "tel",
          placeholder: "0712345678",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return pubTisiniApi
          .post(`/users/login`, credentials)
          .then((res) => {
            if (res.status === 200) {
              return res.data;
            }
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              throw new Error("Login failed");
            }
            throw new Error("Login failed");
          })||null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        console.log("User: ", user);

        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  secret: configService.getKey("NEXTAUTH_SECRET"),
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: configService.getKey("NODE_ENV") === "development",
};

export default authOptions;
