import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubAuthProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";
import { NEW_USER_PAGE, SIGNIN_PAGE } from "@lib/constants";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      if (session.user && token) {
        session.user.id = token.uid;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user, account, isNewUser }) {
      if (user) {
        const u = await prisma.user.findFirst({
          where: {
            id: user.id,
          },
          select: {
            username: true,
          },
        });
        token.uid = user.id;
        token.username = u?.username || null;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: SIGNIN_PAGE,
    newUser: NEW_USER_PAGE,
  },
  events: {},
};

export default NextAuth(authOptions);
