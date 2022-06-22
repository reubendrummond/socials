import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { IncomingMessage } from "http";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
  Redirect,
} from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { ParsedUrlQuery } from "querystring";

// types
export interface ExtendedContext<
  Q extends ParsedUrlQuery,
  D extends PreviewData
> extends GetServerSidePropsContext<Q, D> {
  decodedToken: DecodedIdToken;
  user: UserSS;
}

export type ExtendedGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (context: ExtendedContext<Q, D>) => Promise<GetServerSidePropsResult<P>>;

interface UserSS {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
}

// functions
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

export const userFromDecodedToken = (decodedToken: DecodedIdToken): UserSS => {
  const {
    uid,
    email,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    picture: photoURL,
  } = decodedToken;

  return {
    uid,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
  };
};
