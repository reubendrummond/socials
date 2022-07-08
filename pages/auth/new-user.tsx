import { AFTER_LOGIN_PAGE, NEW_USER_PAGE } from "@lib/constants";
import { RequireServerSideAuth, SSWithUser } from "@lib/wrappers/SSAuth";
import MainLayout from "layouts/MainLayout";
import React from "react";
import prisma from "@lib/prisma";
const NewUser = () => {
  return (
    <MainLayout>
      <div>new user page</div>
    </MainLayout>
  );
};

export default NewUser;

export const getServerSideProps = SSWithUser(async (context) => {
  const user = context.session.user;
  if (!user)
    return {
      redirect: {
        destination: AFTER_LOGIN_PAGE,
        permanent: true,
      },
    };

  const u = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (u && u.username)
    return {
      redirect: {
        destination: AFTER_LOGIN_PAGE,
        permanent: true,
      },
    };

  return {
    props: {},
  };
});
