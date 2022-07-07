import * as yup from "yup";
import { Titles } from "@prisma/client";
import { TypedSchema } from "yup/lib/util/types";

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

export const PostFormSchema = yup.object().shape({
  body: yup.string().required().max(128).min(10),
});
// <yup.InferType<T>
type ConvertSchemaToType<T extends TypedSchema, B = yup.InferType<T>> = {
  [K in keyof B as string extends K ? never : K]: B[K];
};
// for [x: string], x extends string, but string does not extend the value
// if x as string extends string, then we know x is not literally defined

export type RegisterTestData = ConvertSchemaToType<typeof RegisterTestSchema>;
export type RegisterData = ConvertSchemaToType<typeof RegisterSchema>;
export type SignInData = ConvertSchemaToType<typeof SignInSchema>;
export type PostData = ConvertSchemaToType<typeof PostFormSchema>;
