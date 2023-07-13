import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import configService from "@/lib/config";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const res = await fetch(`${BASE_URL}/auth/login/`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentials),
        // });
        // if (!res.ok) {
        //   throw new Error("Login failed");
        // }
        // const data = await res.json();
        const data = {
          username: "jsmith",
          email: "jsmith@example.com",
          name: "John Smith",
        } as any;
        console.log("user", data);

        if (data) {
          // Any object returned will be saved in `user` property of the JWT
          console.log("user", data);

          return data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log("signIn", user, account, profile, email, credentials);

  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  //   async session({ session, user, token }) {
  //     console.log("session", { session }, { user }, { token });
  //     session.user = user;
  //     session.
  //     return session;
  //   },
  // //   async jwt({ token, user, account, profile, isNewUser }) {
  // //     return { ...token, ...user };
  // //   },
  // // },
  // // pages: {
  // //   signIn: "/login",
  // //   signOut: "/auth/signout",
  // //   error: "/login", // Error code passed in query string as ?error=
  // //   // error: "/auth/error", // Error code passed in query string as ?error=
  // //   // verifyRequest: "/auth/verify-request", // (used for check email message)
  // //   // newUser: null, // If set, new users will be directed here on first sign in
  // },
  secret: configService.getKey("NEXTAUTH_SECRET"),
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: configService.getKey("NODE_ENV") === "development",
};

export default authOptions;
