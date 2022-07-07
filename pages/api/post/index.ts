import type { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken, verifyIdTokenFromHeader } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";
import { getCookie } from "cookies-next";
import { BackendFirebaseToken } from "@lib/constants";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  const token = getCookie(BackendFirebaseToken, { req, res })?.toString();
  try {
    if (!token) throw new Error("No cookie set");
    const decodedToken = await verifyIdToken(token);
    if (!decodedToken)
      return res.status(403).json({
        errors: { status: 403, detail: "Unauthorised" },
      });

    // validate post
    const user = await prisma.user.findFirst({
      where: { uid: decodedToken.uid },
    });

    if (user) {
      const p = await prisma.post.create({
        data: {
          description: "A test post",
          authorId: user.id,
        },
      });

      res.status(201).json({ data: p });
    }
  } catch (err) {
    res.status(400).json({
      data: err instanceof Error ? err.message : "err",
    });
  }
}
