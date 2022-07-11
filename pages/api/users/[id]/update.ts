import prisma from "@lib/prisma";
import ApiRouteHandler from "@lib/api/wrappers";
import { ApiError } from "@lib/api/errors";

const handler = ApiRouteHandler({
  handlePATCH: {
    authRequired: true,
    handler: async (req, res) => {
      const username = JSON.parse(req.body).username;

      if (!username || typeof username !== "string")
        throw new ApiError("Must send a username", 400);

      if (username === req.session.user.username) {
        return res
          .status(304)
          .json({ success: true, data: "Username not modified" });
      }

      const user = await prisma.user.update({
        data: {
          username: Array.isArray(username) ? username[0] : username,
        },
        where: {
          id: req.session.user.id,
        },
      });

      return res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
    },
  },
});

export default handler;
