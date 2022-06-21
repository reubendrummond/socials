import { User } from "@prisma/client";
import prisma from "@prisma";
import React from "react";
import MainLayout from "layouts/MainLayout";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import { CustomNextPage } from "@lib/types/page";

interface UserProps {
  users: User[];
}

const Display: CustomNextPage<UserProps> = (props) => {
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
