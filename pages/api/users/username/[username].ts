import { ApiError } from "@lib/api/errors";
import ApiRouteHandler from "@lib/api/wrappers";
import prisma from "@lib/prisma";

const handler = ApiRouteHandler({
  handleGET: async (req, res) => {
    const username = req.query.username;

    const user = await prisma.user.findFirst({
      where: {
        username: typeof username === "string" ? username : username[0],
      },
    });

    if (!user) throw new ApiError("User not found", 404);

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  },
});

export default handler;
