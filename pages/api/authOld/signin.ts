import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_AUTH_TOKEN_KEY } from "@lib/constants";
import { verifyIdToken, verifyIdTokenFromHeader } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";
import { setCookie } from "cookies-next";
import { getAuth } from "@lib/firebase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(400)
      .json({ error: "No authorization header was provided" });
  const els = authHeader?.split(" ");

  if (els.length !== 2)
    return res
      .status(400)
      .json({ error: "Authrorization header must be in form 'Bearer TOKEN'" });
  const token = els[1];
  return getAuth()
    .verifyIdToken(token)
    .then((_) => {
      console.log("called");
      setCookie(BACKEND_AUTH_TOKEN_KEY, token, {
        req,
        res,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      return res.status(200).json({ data: "Token is legit" });
    })
    .catch((_) => {
      return res.status(401).json({ error: "Invalid token" });
    });
}
