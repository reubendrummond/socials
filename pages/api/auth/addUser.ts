import { verifyIdTokenFromHeader } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const addUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) => {
  try {
    const { decodedToken } = await verifyIdTokenFromHeader(req.headers);
    // const userPromise = await prisma
  } catch {
  }
};

export default addUserHandler;
