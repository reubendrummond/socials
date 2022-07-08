import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    const limit = Number(req.query.limit);
    const take = limit > 0 && limit < 20 ? limit : 10;

    const posts = await prisma.post.findMany({
      take,
      include: {
        Reaction: {
          select: {
            id: true,
          },
        },
        Comment: true,
        _count: {
          select: {
            Comment: true,
            Reaction: true,
          },
        },
      },
    });

    if (!posts) return res.status(404).json({ data: "Not found" });

    return res.status(200).json({
      data: posts,
    });
  } catch (err) {
    return res.status(400).json({
      data: err instanceof Error ? err.message : "There was an error",
    });
  }
}
