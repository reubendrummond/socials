import { User } from "@prisma/client";
import prisma from "@prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { logError } from "lib/logError";
import MainLayout from "layouts/MainLayout";
import { useAuth } from "@lib/hooks/useAuth";
import { verifyIdToken } from "@lib/auth";
import { BackendFirebaseToken } from "@lib/constants";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import { CustomNextPage } from "@lib/types/page";

interface UserProps {
  users: User[];
}

const Display: CustomNextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { users } = props;

  return (
    <MainLayout>
      {users.length ? (
        users.map(({ id, name, email }) => {
          return (
            <div key={id}>
              <h1>{name}</h1>
              <p>{email}</p>
              <p>{id}</p>
            </div>
          );
        })
      ) : (
        <p>No users!!!</p>
      )}
    </MainLayout>
  );
};

Display.title = "Display";
// Display.layout = "main";
Display.authRequired = "USER";

export default Display;

export const getServerSideProps = RequireServerSideAuth<UserProps>(
  async (context) => {
    let users: User[] = [];
    try {
      users = await prisma.user.findMany();
    } catch (err) {
      console.log(err);
    }

    return {
      props: {
        users,
      },
    };
  },
  "USER"
);
