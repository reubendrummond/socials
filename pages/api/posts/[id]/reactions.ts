import { ApiError } from "@lib/api/errors";
import ApiRouteHandler from "@lib/api/wrappers";
import { Reactions } from "@prisma/client";
import prisma from "@lib/prisma";
import { ApiPostsIdReactions } from "@lib/types/response";

const handler = ApiRouteHandler<ApiPostsIdReactions, {}, {}, {}, {}>({
  handleGET: async (req, res) => {
    const postId = Number(req.query.id ? req.query.id : req.query.id[0]);
    const reactions = await prisma.reaction.findMany({
      where: {
        postId,
      },
    });

    // get additional counts
    const reactionTypeCount = {
      reactions: reactions.length,
      LIKE: 0,
      ANGRY: 0,
      LOL: 0,
    };

    reactions.forEach(({ type }) => {
      reactionTypeCount[type]++;
    });

    return res.status(200).json({
      success: true,
      data: {
        reactions,
        _count: reactionTypeCount,
      }
    });
  },
  handlePOST: {
    authRequired: true,
    handler: async (req, res) => {
      const postId = Number(
        typeof req.query.id === "string" ? req.query.id : req.query.id[0]
      );
      if (!postId) throw new ApiError("Invalid post id", 400);

      const reactionType = req.body.reactionType as Reactions;
      const userId = req.session.user.id;

      const existingReaction = await prisma.reaction.findFirst({
        where: {
          AND: {
            postId,
            userId,
          },
        },
      });

      if (!existingReaction) {
        const reaction = await prisma.reaction.create({
          data: {
            type: reactionType,
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return res.status(201).json({
          success: true,
          data: {
            reaction,
          },
        });
      }

      const reaction = await prisma.reaction.update({
        data: {
          type: reactionType,
        },
        where: {
          id: existingReaction.id,
        },
      });

      return res.status(200).json({
        success: true,
        data: {
          reaction,
        },
      });
    },
  },
  handleDELETE: {
    authRequired: true,
    handler: async (req, res) => {
      const postId = Number(
        typeof req.query.id === "string" ? req.query.id : req.query.id[0]
      );
      if (!postId) throw new ApiError("Invalid post id", 400);

      const del = await prisma.reaction.deleteMany({
        where: {
          AND: {
            postId,
            userId: req.session.user.id,
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: {
          delete: del,
        },
      });
    },
  },
});

export default handler;
