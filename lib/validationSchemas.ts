import * as yup from "yup";
import { Titles } from "@prisma/client";

const titles = Object.values(Titles);

export const RegisterTestSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  title: yup.string().required().oneOf(titles),
  age: yup.number().required().positive().max(100),
});

export const RegisterSchema = yup.object().shape({
  email: yup.string().required().email("Input must be an email"),
  password: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters long"),
  passwordConfirm: yup
    .string()
    .required()
    .equals([yup.ref("password")], "Passwords must match"),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export type RegisterTestData = yup.InferType<typeof RegisterTestSchema>;
export type RegisterData = yup.InferType<typeof RegisterSchema>;
export type SignInData = yup.InferType<typeof SignInSchema>;
