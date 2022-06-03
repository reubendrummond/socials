import { User } from "@prisma/client";
import prisma from "@prisma";
import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import { logError } from "lib/logError";
import MainLayout from "layouts/MainLayout";

interface UserProps {
  users: User[];
}

const Display = (props: UserProps) => {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <MainLayout>
      {props.users ? (
        props.users.map(({ id, name, email }) => {
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

export default Display;

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  try {
    const users = await prisma.user.findMany();
    return {
      props: {
        users,
      },
      revalidate: 60,
    };
  } catch (err) {
    if (err instanceof Error) logError(err);
    throw err;
  }
};
