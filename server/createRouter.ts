import { router, TRPCError } from "@trpc/server";
import { Context } from "./context";

export const createRouter = () => {
  return router<Context>();
};

export const createProtectedRouter = () => {
  return router<Context>().middleware(async ({ ctx, next }) => {
    if (!ctx.session)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  });
};
