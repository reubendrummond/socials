import { verifyIdToken } from "@lib/auth";
import { BackendFirebaseToken } from "@lib/constants";
import { Role } from "@prisma/client";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { returnURL, redirectToSignIn, destinationWithNext } from "./utils";

interface ExtendedContext<Q extends ParsedUrlQuery, D extends PreviewData>
  extends GetServerSidePropsContext<Q, D> {
  decodedToken: DecodedIdToken;
}

type ExtendedGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (context: ExtendedContext<Q, D>) => Promise<GetServerSidePropsResult<P>>;

export const RequireServerSideAuth = <T = {}>(
  getServerSideProps: ExtendedGetServerSideProps<T>,
  role: Role | "UNAUTHED" = "USER"
): ExtendedGetServerSideProps<T> => {
  const wrapped: ExtendedGetServerSideProps<T> = async (context) => {
    const token = context.req.cookies[BackendFirebaseToken] || "";

    const decodedToken = await verifyIdToken(token);
    const tokenVerified = Boolean(decodedToken);

    const url = returnURL(context.req);

    if (!decodedToken && role === "UNAUTHED")
      return getServerSideProps(context);

    // prevent unauthenticated users from visiting pages which require authentication
    if (!decodedToken) {
      // console.log("not verfied!");
      return redirectToSignIn(url);
    }

    // get user to verify email if they have not
    if (!decodedToken.email_verified) {
      return {
        redirect: {
          permanent: false,
          destination: destinationWithNext("/auth/verify", url),
        },
      };
    }

    // prevent authenticated users visiting auth pages like signin and register
    if (role === "UNAUTHED") {
      if (tokenVerified) {
        return {
          redirect: {
            permanent: true,
            destination: "/dashboard",
          },
        };
      }
    }

    context.decodedToken = decodedToken;

    return getServerSideProps(context);
  };

  return wrapped;
};

export const SSWithUser = <T = {}>(
  getServerSideProps: ExtendedGetServerSideProps<T>,
  role: Role | "UNAUTHED" = "USER"
): ExtendedGetServerSideProps<T> => {
  const wrapped: ExtendedGetServerSideProps<T> = async (context) => {
    const token = context.req.cookies[BackendFirebaseToken] || "";
    const url = returnURL(context.req);
    const decodedToken = await verifyIdToken(token);
    if (!decodedToken) return redirectToSignIn(url);

    context.decodedToken = decodedToken;

    return getServerSideProps(context);
  };

  return wrapped;
};
