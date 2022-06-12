import { verifyIdToken } from "@lib/auth";
import { BackendFirebaseToken } from "@lib/constants";
import { Role } from "@prisma/client";
import { GetServerSideProps } from "next";

export const RequireServerSideAuth = <T>(
  getServerSideProps: GetServerSideProps<T>,
  role: Role = "USER"
): GetServerSideProps<T> => {
  const wrapped: GetServerSideProps<T> = async (context) => {
    const token = context.req.cookies[BackendFirebaseToken];
    const { url } = context.req;
    // console.log(token);
    if (!token || !(await verifyIdToken(token))) {
      return {
        redirect: {
          statusCode: 307,
          destination: `/auth/signin${url && `?next=${url.substr(1)}`}`,
        },
      };
    }

    return getServerSideProps(context);
  };

  return wrapped;
};
