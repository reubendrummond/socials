import { AFTER_SIGNIN_PAGE, NEW_USER_PAGE } from "@lib/constants";
import { Role } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import {
  returnURL,
  redirectToSignIn,
  destinationWithNext,
  ExtendedGetServerSideProps,
} from "./utils";
import { authOptions } from "pages/api/auth/[...nextauth]";
import prisma from "@lib/prisma";

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

    // if user has a username but jwt is old and does not have that username
    if (session.user && !session.user.username) {
      const u = await prisma.user.findFirst({
        select: { username: true },
        where: {
          id: session.user.id,
        },
      });

      // get to register
      if (!u?.username)
        return {
          redirect: {
            destination: NEW_USER_PAGE,
            permanent: false,
          },
        };
    }

    // prevent authenticated users visiting auth pages like signin and register
    if (role === "UNAUTHED") {
      if (session) {
        return {
          redirect: {
            permanent: true,
            destination: AFTER_SIGNIN_PAGE,
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
