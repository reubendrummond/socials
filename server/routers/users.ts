import { createRouter, createProtectedRouter } from "server/createRouter";
import prisma from "@lib/prisma";
import { z } from "zod";

export const usersRouter = createProtectedRouter()
  .query("all", {
    resolve: async ({ ctx }) => {
      const users = await prisma.user.findMany();
      return {
        users,
      };
    },
  })
  .query("id", {
    input: z.object({ id: z.string() }),
    resolve: async ({ ctx, input }) => {
      const user = await prisma.user.findFirst({
        where: {
          id: input.id,
        },
      });
      return {
        user,
      };
    },
  })
  .query("username", {
    input: z.object({ username: z.string() }),
    resolve: async ({ ctx, input }) => {
      const user = await prisma.user.findFirst({
        where: {
          username: input.username,
        },
      });
      return {
        user,
      };
    },
  });
