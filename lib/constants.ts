import { Role } from "@prisma/client";
export const AppName = "Socials";
export const BACKEND_AUTH_TOKEN_KEY = "firebaseAccessToken";
export const LoginPage = "/auth/signin";
export const RegisterPage = "/auth/register";
export const AFTER_LOGIN_PAGE = "/feed";
export const NEW_USER_PAGE = "/auth/new-user";
export const REDIRECT_AFTER_LOGIN_PAGE = NEW_USER_PAGE;
export const BACKUP_PROFILE_IMAGE = "/add later";

export type AuthRequiredOptions = Role | "UNAUTHED";
