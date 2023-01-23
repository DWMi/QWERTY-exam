import db from "../../../utils/db";
import User from "../../../models/User";
import NextAuth from "next-auth/next";
import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          //return user object from DB
          return {
            _id: user._id,
            email: user.email,
            name: user.firstName,
            isAdmin: user.isAdmin,
            address: user.address
          };
        }
        throw new Error("Invalid email or password!");
      },
    }),
  ],
});
