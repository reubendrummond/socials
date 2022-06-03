import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@lib/firebase/admin";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
  console.log(token);
  return getAuth()
    .verifyIdToken(token)
    .then((_) => {
      res.setHeader(
        "set-cookie",
        `firebaseToken=${token}; path=/; samesite=lax; httponly;`
      );
      return res.status(200).json({ data: "Token is legit" });
    })
    .catch((_) => {
      return res.status(401).json({ error: "Invalid token" });
    });
}
