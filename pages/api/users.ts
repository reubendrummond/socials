import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await prisma?.user.findMany();
  res.status(200).json({ users });
}
