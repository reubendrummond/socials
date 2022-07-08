import { verifyAuthCookie } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

const addUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) => {
  try {
    const decodedToken = await verifyAuthCookie(req, res);

    const user = await prisma.user.findFirst({
      where: {
        uid: decodedToken.uid,
      },
    });
    if (user) {
      return res.status(200).json({
        data: "User already exists",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        uid: decodedToken.uid,
      },
    });

    return res.status(201).json({
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      errors: {
        detail:
          err instanceof Error
            ? err.message
            : "There was an error with the token :(",
      },
    });
  }
};

export default addUserHandler;
