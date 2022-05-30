import * as yup from "yup";

type Titles = "Mr" | "Mrs" | "Ms" | "Lord";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  title: yup.string().required(),
  //.oneOf(["Mr", "Mrs", "Ms", "Lord"]),
  age: yup.number().required().positive().max(100),
});

export type RegisterData = yup.InferType<typeof RegisterSchema>;
