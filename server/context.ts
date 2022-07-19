import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  if (!opts?.req || !opts.res) return { session: null };

  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    authOptions
  );

  return { session };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
