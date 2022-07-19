import { router } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { z } from "zod";
import { usersRouter } from "server/routers/users";
import { createRouter } from "server/createRouter";
import { createContext } from "server/context";

export const appRouter = createRouter()
  .middleware(async ({ next }) => {
    // logger
    const start = Date.now();
    const result = await next();
    const dif = Date.now() - start;
    // console.log(`Request duration: ${dif}ms`);
    return result;
  })
  .merge("users.", usersRouter);

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
