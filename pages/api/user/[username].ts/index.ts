import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    const username = req.query.username;

    const u = await prisma.user.findFirst({
      where: {
        username: Array.isArray(username) ? username[0] : username,
      },
    });

    if (!u) return res.status(404).json({ data: "Not found" });

    return res.status(200).json({
      data: u,
    });
  } catch (err) {
    return res.status(400).json({
      data: err instanceof Error ? err.message : "There was an error",
    });
  }
}
