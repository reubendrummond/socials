import { IncomingMessage } from "http";
import { Redirect } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const redirectToSignIn = (url?: URL | null): { redirect: Redirect } => {
  return {
    redirect: {
      statusCode: 307,
      destination: destinationWithNext(`/auth/signin`, url),
    },
  };
};

export const returnURL = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
): URL | null => {
  let { url } = req;
  if (!url) return null;

  if (process.env.NODE_ENV === "development") {
    url = url?.replace("/_next/data/development/", "");
    url = url?.replace(".json", "");
  }

  console.log(url);
  return new URL(url, `http://${req.headers.host}`);
};

export const destinationWithNext = (
  destination: string,
  url?: URL | null
): string => {
  if (!url) return destination;
  return `${destination}?next=${url.pathname.substring(1)}`;
};
