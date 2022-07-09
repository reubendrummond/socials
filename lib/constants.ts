import { Role } from "@prisma/client";
export const AppName = "Socials";
export const BACKEND_AUTH_TOKEN_KEY = "firebaseAccessToken";
export const SIGNIN_PAGE = "/auth/signin";
export const REGISTER_PAGE = "/auth/register";
export const AFTER_SIGNIN_PAGE = "/feed";
export const NEW_USER_PAGE = "/auth/new-user";
export const BACKUP_PROFILE_IMAGE = "/add later";

export type AuthRequiredOptions = Role | "UNAUTHED";
