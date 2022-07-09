import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    if (req.method !== "PATCH") {
      res.status(405);
      throw new Error("Method not allowed");
    }
    const username = JSON.parse(req.body).username;

    if (!username) {
      res.status(400);
      throw new Error("Must define field to update");
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(403);
      throw new Error("Must be authenticated");
    }
    if (username === session.user?.username) {
      return res.status(304).json({ data: "Username not modified" });
    }

    const u = await prisma.user.update({
      data: {
        username: Array.isArray(username) ? username[0] : username,
      },
      where: {
        id: session.user?.id,
      },
    });

    return res.status(200).json({ data: u });
  } catch (err) {
    return res.json({
      data: err instanceof Error ? err.message : "There was an error",
    });
  }
}
