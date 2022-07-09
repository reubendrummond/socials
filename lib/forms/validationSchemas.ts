import * as yup from "yup";
import { TypedSchema } from "yup/lib/util/types";

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

export const UserRegistrationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Enter a username")
    .min(6, "Username must be at least 6 characters long")
    .matches(/^(?=.*[aA-zZ])[aA-zA\d]+$/, "Invalid username")
    .test(
      "checkUsernameUnique",
      "Username unavailable",
      async (username, { createError }) => {
        if (typeof username === "string" && username.length < 6) return false;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        try {
          const res: Response = await fetch(`/api/user/${username}`, {
            signal: controller.signal,
          });

          clearTimeout(timeout);

          if (res.status === 404) return true;
          if (!res.ok)
            return createError({
              message: "There was an error validating the username",
            });

          const { data } = await res.json();
          return !data.username;
        } catch (err) {
          return createError({
            message: "Username cannot be validated right now",
          });
        }
      }
    ),
});

// <yup.InferType<T>
type ConvertSchemaToType<T extends TypedSchema, B = yup.InferType<T>> = {
  [K in keyof B as string extends K ? never : K]: B[K];
};
// for [x: string], x extends string, but string does not extend the value
// if x as string extends string, then we know x is not literally defined

export type RegisterData = ConvertSchemaToType<typeof RegisterSchema>;
export type SignInData = ConvertSchemaToType<typeof SignInSchema>;
export type PostData = ConvertSchemaToType<typeof PostFormSchema>;
export type UserRegistrationData = ConvertSchemaToType<
  typeof UserRegistrationSchema
>;
