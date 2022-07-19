import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import ApiRouteHandler from "@lib/api/wrappers";
import { ApiError } from "@lib/api/errors";
import { PostFormSchema } from "@lib/forms/validationSchemas";

const handler = ApiRouteHandler({
  handleGET: async (req, res) => {
    const id = Number(typeof req.query.id ? req.query.id : req.query.id[0]);
    if (isNaN(id)) throw new ApiError("Post id must be a number", 400);
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            reactions: true,
          },
        },
      },
    });

    if (!post) throw new ApiError("Post not found", 404);

    return res.status(200).json({
      success: true,
      data: {
        post,
      },
    });
  },
  handlePOST: {
    authRequired: true,
    handler: async (req, res) => {
      // validate post
      const fields = PostFormSchema.cast(req.body);
      if (!fields.body || !(await PostFormSchema.isValid(fields)))
        throw new ApiError("Data not valid", 400);

      const post = await prisma.post.create({
        data: {
          body: fields.body,
          userId: req.session.user.id,
        },
      });

      res.status(201).json({
        success: true,
        data: {
          post,
        },
      });
    },
  },
});

export default handler;
