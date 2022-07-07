import { RegisterTestSchema } from "@lib/forms/validationSchemas";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma";
import { Prisma } from "@prisma/client";
import { logError } from "@lib/logError";

type Data = {
  name: string;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(200).json({ name: "wot", data: "this is a test" });
  // if (req.method !== "POST")
  //   return res.status(400).json({
  //     name: "Only post requests allowed",
  //   });

  // cast pattern
  // const fields = RegisterTestSchema.cast(req.body) as Prisma.UserCreateInput;
  // if (!(await RegisterTestSchema.isValid(fields)))
  //   return res.status(400).json({
  //     name: "Form not valid",
  //   });

  // try {
  //   const c = await prisma?.user.create({
  //     data: {
  //       name: fields.name,
  //       email: fields.email,
  //       age: fields.age,
  //       title: fields.title,
  //     },
  //   });

  //   res.status(201).json({ name: "User registered", data: c });
  // } catch (err) {
  //   if (err instanceof Prisma.PrismaClientKnownRequestError) {
  //     switch (err.code) {
  //       case "P2002":
  //         return res.status(409).json({
  //           name: "This email is already registered.",
  //           error: err,
  //         });
  //       default:
  //         logError(err);
  //         return res.status(500).json({
  //           name: "There was an issue adding the record",
  //           error: err,
  //         });
  //     }
  //   }
  //   return res.status(500).json({
  //     name: "Something went wrong",
  //     error: err,
  //   });
  // }
}
