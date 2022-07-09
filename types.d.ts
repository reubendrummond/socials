import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      username: string | null;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
    username: string | null;
  }
}
