import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubAuthProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  //   callbacks: {
  //     redirect({ url, baseUrl }) {
  //       console.log("redirect", url, baseUrl);
  //       return baseUrl + "/feed";
  //     },
  //   },
};

export default NextAuth(authOptions);
