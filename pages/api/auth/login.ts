import type { NextApiRequest, NextApiResponse } from "next";
import { BackendFirebaseToken } from "@lib/constants";
import { verifyIdToken, verifyIdTokenFromHeader } from "@lib/auth";
import { StandardResponse } from "@lib/types/backend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  const authHeader = req.headers.authorization;

  // if (!authHeader)
  //   return res
  //     .status(400)
  //     .json({ errors: { detail: "No authorization header was provided" } });
  // const els = authHeader?.split(" ");

  // if (els.length !== 2)
  //   return res.status(400).json({
  //     errors: {
  //       detail: "Authrorization header must be in form 'Bearer TOKEN'",
  //     },
  //   });
  // const token = els[1];

  return verifyIdTokenFromHeader(req.headers)
    .then(({ token }) => {
      res.setHeader(
        "set-cookie",
        `${BackendFirebaseToken}=${token}; path=/; samesite=lax; httponly;`
      );
      return res.status(200).json({ data: "Token is legit" });
    })
    .catch((err) => {
      if (err instanceof Error)
        return res.status(401).json({ errors: { detail: err.message } });
      return res.status(401).json({ errors: { detail: "Token invalid" } });
    });
}
