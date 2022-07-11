import { ErrorStatusCodes, StandardResponse } from "@lib/types/backend";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { ApiError } from "./errors";

type ApiRequestWithAuth = NextApiRequest & { session: Required<Session> };

type AuthApiHandler<A extends boolean> = (
  req: A extends true ? ApiRequestWithAuth : NextApiRequest,
  res: NextApiResponse<StandardResponse>
) => unknown | Promise<unknown>;

type ApiHandler =
  | {
      authRequired: true;
      handler: HandlerWithAuth;
    }
  | {
      authRequired: false;
      handler: HandlerNoAuth;
    }
  | HandlerNoAuth;

export type HandlerNoAuth = AuthApiHandler<false>;
export type HandlerWithAuth = AuthApiHandler<true>;

interface RequestHandlers {
  handleGET?: ApiHandler;
  handlePOST?: ApiHandler;
  handlePUT?: ApiHandler;
  handlePATCH?: ApiHandler;
  handleDELETE?: ApiHandler;
}

const ApiRouteHandler = ({
  handleGET,
  handlePOST,
  handlePUT,
  handlePATCH,
  handleDELETE,
}: RequestHandlers): AuthApiHandler<true> => {
  return async (req, res) => {
    try {
      let handler: ApiHandler | undefined;

      switch (req.method) {
        case "GET":
          if (!handleGET) break;
          handler = handleGET;
          break;
        case "POST":
          if (!handlePOST) break;
          handler = handlePOST;
          break;
        case "PUT":
          if (!handlePUT) break;
          handler = handlePUT;
          break;
        case "PATCH":
          if (!handlePATCH) break;
          handler = handlePATCH;
          break;
        case "DELETE":
          if (!handleDELETE) break;
          handler = handleDELETE;
          break;
      }

      if (!handler) throw new Error(`${req.method} method not supported`);

      // no auth required if function
      if (typeof handler === "function") return await handler(req, res);

      // auth required
      if (handler.authRequired) {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) throw new Error("Need to be authenticated!");
        if (!session.user) throw new Error("Issue with session");
        req.session = session as Required<Session>;
      }

      return await handler.handler(req, res);
    } catch (err) {
      return errorHandler(res, err);
    }
  };
};

const DEFAULT_ERROR_STATUS_CODE = 400;
const DEFAULT_ERROR_MESSAGE = "There was an error. Please try again.";
const errorHandler = (res: NextApiResponse<StandardResponse>, err: any) => {
  // default error
  let message: string = DEFAULT_ERROR_MESSAGE;
  let status: ErrorStatusCodes = DEFAULT_ERROR_STATUS_CODE;

  if (err instanceof Prisma.PrismaClientValidationError) {
    status = 400;
    message = "There was an error validating the request.";
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    status = 500;
    message = "Cannot connect to DB at this time.";
  } else {
    status =
      err instanceof ApiError ? err.statusCode : DEFAULT_ERROR_STATUS_CODE;
    if (err.message) message = err.message;
  }

  // handle API errors

  return res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
};

export default ApiRouteHandler;
