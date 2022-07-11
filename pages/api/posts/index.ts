import prisma from "@lib/prisma";
import { PostFormSchema } from "@lib/forms/validationSchemas";
import ApiRouteHandler, {
  HandlerNoAuth,
  HandlerWithAuth,
} from "@lib/api/wrappers";

const handlePOST: HandlerWithAuth = async (req, res) => {
  // validate post
  const fields = PostFormSchema.cast(req.body);

  if (!fields.body || !(await PostFormSchema.isValid(fields)))
    throw new Error("Data not valid");

  const post = await prisma.post.create({
    data: {
      body: fields.body,
      userId: req.session.user.id,
    },
    include: {
      user: true,
    },
  });

  res.status(201).json({ success: true, data: { post } });
};

const handleGET: HandlerNoAuth = async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const take = limit > 0 && limit < 20 ? limit : 10;

    const posts = await prisma.post.findMany({
      take,
      include: {
        reactions: {
          select: {
            id: true,
          },
        },
        comments: true,
        user: true,
        _count: {
          select: {
            comments: true,
            reactions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts) throw new Error("No posts found");

    return res.status(200).json({
      success: true,
      data: { posts },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: err instanceof Error ? err.message : "There was an error",
      },
    });
  }
};

const handler = ApiRouteHandler({
  handleGET,
  handlePOST: {
    authRequired: true,
    handler: handlePOST,
  },
});

export default handler;
