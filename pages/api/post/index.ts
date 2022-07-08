import type { NextApiRequest, NextApiResponse } from "next";
import { verifyAuthCookie } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";
import { PostFormSchema } from "@lib/forms/validationSchemas";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    if (req.method !== "POST" || !req.body) throw new Error("Must post");

    // validate post
    const fields = PostFormSchema.cast(req.body);
    if (!(await PostFormSchema.isValid(fields)))
      throw new Error("Data not valid");

    // get user
    const decodedToken = await verifyAuthCookie(req, res);
    const user = await prisma.user.findFirst({
      where: { uid: decodedToken.uid },
    });
    if (!user) throw new Error("Error retrieving user");

    const p = await prisma.post.create({
      data: {
        body: fields.body,
        authorId: user.id,
      },
    });

    res.status(201).json({ data: p });
  } catch (err) {
    res.status(400).json({
      data: err instanceof Error ? err.message : "err",
    });
  }
}
