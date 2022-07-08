import { getCookie } from "cookies-next";
import { verify } from "crypto";
import { IncomingHttpHeaders } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_AUTH_TOKEN_KEY } from "./constants";
import { getAuth } from "./firebase/admin";

export const verifyIdToken = async (firebaseToken: string) => {
  return getAuth()
    .verifyIdToken(firebaseToken)
    .catch((_) => null);
};

export const verifyAuthCookie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = getCookie(BACKEND_AUTH_TOKEN_KEY, { req, res })?.toString();
  if (!token) throw new Error("No token set");

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken;
  } catch (err) {
    throw err;
  }
};

export const verifyIdTokenFromHeader = async (headers: IncomingHttpHeaders) => {
  const authHeader = headers.authorization;
  if (!authHeader) throw new Error("No authorization header was provided");

  const els = authHeader?.split(" ");

  if (els.length !== 2)
    throw new Error("Authrorization header must be in form 'Bearer <TOKEN>'");

  const token = els[1];

  return verifyIdToken(token)
    .then((decodedToken) => {
      if (!decodedToken) throw new Error("Error getting token");
      return {
        decodedToken,
        token,
      };
    })
    .catch((err) => {
      throw err;
    });
};
