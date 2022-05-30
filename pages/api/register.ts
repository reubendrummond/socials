import { RegisterSchema } from "@lib/validationSchemas";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma";
import { Prisma } from "@prisma/client";

type Data = {
  name: string;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(400).json({
      name: "Only post requests allowed",
    });

  try {
    const fields = RegisterSchema.cast(req.body);
    console.log(fields);

    if (await RegisterSchema.isValid(fields)) {
      try {
        const c = await prisma?.customer.create({
          data: {
            name: fields.name ?? "",
            email: fields.email ?? "",
            age: fields.age ?? 0,
            title: fields.title ?? "",
          },
        });
        res.status(201).json({ name: "User registered", data: c });
      } catch (err) {
        console.log(err);

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          switch (err.code) {
            case "P2002":
              res.status(500).json({
                name: "This email is already registered.",
                error: err,
              });
              break;
            default:
              res.status(500).json({
                name: "There was an issue adding the record",
                error: err,
              });
              break;
          }
          return;
        }
      }
    }
  } catch (err) {
    console.log(err);

    res.status(400).json({
      name: "Form not valid",
      error: err,
    });
  }
}
