import { verifyIdToken } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { BackendFirebaseToken } from "@lib/constants";
import prisma from "@lib/prisma";

const addUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) => {
  try {
    const token = getCookie(BackendFirebaseToken, { req, res })?.toString();
    if (!token) throw new Error("No cookie set");

    const decodedToken = await verifyIdToken(token);
    if (!decodedToken) throw new Error("Invalid token");

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
