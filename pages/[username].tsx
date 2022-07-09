import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import prisma from "@lib/prisma";
import { User } from "@prisma/client";
import MainLayout from "layouts/MainLayout";

interface ProfileProps {
  user: User;
}
export const Profile = ({ user }: ProfileProps) => {
  return (
    <MainLayout>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </MainLayout>
  );
};

export default Profile;

export const getStaticProps: GetStaticProps<ProfileProps> = async (context) => {
  try {
    const username = context.params?.username;
    if (typeof username !== "string")
      throw new Error("Invalid username supplied");
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        username: true,
        email: true,
        name: true,
        image: true,
        bio: true,
      },
    });

    if (!user) throw new Error("No user found");

    return {
      props: {
        user: user as User,
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const res = await prisma.user.findMany({
    select: {
      id: true,
    },
  });
  const paths = res.map(({ id }) => ({
    params: {
      username: String(id),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
