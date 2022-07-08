import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_AUTH_TOKEN_KEY } from "@lib/constants";
import { StandardResponse } from "@lib/types/backend";
import { removeCookies } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  removeCookies(BACKEND_AUTH_TOKEN_KEY, { req, res });
  // res.setHeader(
  //   "set-cookie",
  //   `${BackendFirebaseToken}=deleted; path=/; samesite=lax; httponly;`
  // );
  return res.status(200).json({ data: "Token removed" });
}
