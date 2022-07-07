import { Role } from "@prisma/client";
export const AppName = "Socials";
export const BackendFirebaseToken = "firebaseAccessToken";
export const LoginPage = "/auth/signin";
export const RegisterPage = "/auth/register";
export const AfterLoginPage = "/feed";
export const BACKUP_PROFILE_IMAGE = "/add later";

export type AuthRequiredOptions = Role | "UNAUTHED";
