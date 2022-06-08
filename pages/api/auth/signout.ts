import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@lib/firebase/admin";
import { BackendFirebaseToken } from "@lib/constants";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader(
    "set-cookie",
    `${BackendFirebaseToken}=deleted; path=/; samesite=lax; httponly;`
  );
  return res.status(200).json({ data: "Token removed" });
}
