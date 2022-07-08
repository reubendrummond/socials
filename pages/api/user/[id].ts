import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    const id = Number(req.query.id);
    const u = await prisma.user.findFirst({
      where: {
        id,
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
