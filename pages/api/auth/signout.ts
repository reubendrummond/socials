import type { NextApiRequest, NextApiResponse } from "next";
import { BackendFirebaseToken } from "@lib/constants";
import { StandardResponse } from "@lib/types/backend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  res.setHeader(
    "set-cookie",
    `${BackendFirebaseToken}=deleted; path=/; samesite=lax; httponly;`
  );
  return res.status(200).json({ data: "Token removed" });
}
