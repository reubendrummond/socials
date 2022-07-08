import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_AUTH_TOKEN_KEY } from "@lib/constants";
import { StandardResponse } from "@lib/types/backend";
import { removeCookies } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  try {
    removeCookies(BACKEND_AUTH_TOKEN_KEY, { req, res });
    return res.status(200).json({ data: "Token removed" });
  } catch (err) {
    return res.status(400).json({ data: "There was an error signing out" });
  }
}
