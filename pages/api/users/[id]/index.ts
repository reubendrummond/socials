import prisma from "@lib/prisma";
import ApiRouteHandler, { HandlerNoAuth } from "@lib/api/wrappers";
import { ApiError } from "@lib/api/errors";

const handleGET: HandlerNoAuth = async (req, res) => {
  const id = req.query.id;

  const user = await prisma.user.findFirst({
    where: {
      id: typeof id === "string" ? id : id[0],
    },
  });

  if (!user) throw new ApiError("User not found", 404);

  return res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
};

const handler = ApiRouteHandler({
  handleGET,
});

export default handler;
