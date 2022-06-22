import { IncomingHttpHeaders } from "http";
import { getAuth } from "./firebase/admin";

export const verifyIdToken = async (firebaseToken: string) => {
  return getAuth()
    .verifyIdToken(firebaseToken)
    .catch((_) => null);
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
      return {
        decodedToken,
        token,
      };
    })
    .catch((err) => {
      throw err;
    });
};
