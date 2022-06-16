import * as yup from "yup";
import { Titles } from "@prisma/client";

const titles = Object.values(Titles);

export const RegisterSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  title: yup.string().required().oneOf(titles),
  age: yup.number().required().positive().max(100),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

export type RegisterData = yup.InferType<typeof RegisterSchema>;
export type SignInData = yup.InferType<typeof SignInSchema>;
