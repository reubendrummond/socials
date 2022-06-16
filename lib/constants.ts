import { Role } from "@prisma/client";
export const AppName = "Socials";
export const BackendFirebaseToken = "firebaseAccessToken";
export const LoginPage = "/auth/signin";
export const RegisterPage = "/auth/register";
export const AfterLoginPage = "/dashboard";

export type AuthRequiredOptions = Role | "UNAUTHED";
