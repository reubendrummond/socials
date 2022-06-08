import { Role } from "@prisma/client";

export const BackendFirebaseToken = "firebaseAccessToken";
export const LoginPage = "/auth/signin";
export const AfterLoginPage = "/display";

export type AuthRequiredOptions = Role | "UNAUTHED";
