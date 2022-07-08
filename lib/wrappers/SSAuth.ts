import { verifyIdToken } from "@lib/auth";
import { AfterLoginPage, BACKEND_AUTH_TOKEN_KEY } from "@lib/constants";
import { Role } from "@prisma/client";
import { getCookie } from "cookies-next";
import { unstable_getServerSession } from "next-auth";
import {
  returnURL,
  redirectToSignIn,
  destinationWithNext,
  ExtendedGetServerSideProps,
} from "./utils";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const RequireServerSideAuth = <T = {}>(
  getServerSideProps: ExtendedGetServerSideProps<T>,
  role: Role | "UNAUTHED" = "USER"
): ExtendedGetServerSideProps<T> => {
  const wrapped: ExtendedGetServerSideProps<T> = async (context) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    const url = returnURL(context.req);

    if (!session && role === "UNAUTHED") return getServerSideProps(context);

    // prevent unauthenticated users from visiting pages which require authentication
    if (!session) {
      // console.log("not verfied!");
      return redirectToSignIn(url);
    }

    // change to has registered
    // get user to verify email if they have not
    // if (!decodedToken.email_verified) {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: destinationWithNext("/auth/verify", url),
    //     },
    //   };
    // }

    // prevent authenticated users visiting auth pages like signin and register
    if (role === "UNAUTHED") {
      if (session) {
        return {
          redirect: {
            permanent: true,
            destination: AfterLoginPage,
          },
        };
      }
    }

    context.session = session;

    return getServerSideProps(context);
  };

  return wrapped;
};

export const SSWithUser = <T = {}>(
  getServerSideProps: ExtendedGetServerSideProps<T>
): ExtendedGetServerSideProps<T> => {
  const wrapped: ExtendedGetServerSideProps<T> = async (context) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
    if (!session) {
      const url = returnURL(context.req);
      return redirectToSignIn(url);
    }

    context.session = session;

    return getServerSideProps(context);
  };

  return wrapped;
};
