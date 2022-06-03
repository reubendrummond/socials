import { User } from "@prisma/client";
import prisma from "@prisma";
import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import { logError } from "lib/logError";
import MainLayout from "layouts/MainLayout";
import { useAuth } from "@lib/hooks/useAuth";
import { verifyIdToken } from "@lib/auth";

interface UserProps {
  users: User[];
}

const Display = (props: UserProps) => {
  // useAuth({ redirect: "/auth/signin", requiredRole: "ADMIN" });

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

export const getServerSideProps: GetServerSideProps<UserProps> = async (
  context
) => {
  const token = context.req.cookies.firebaseToken;
  if (!token) {
  }

  if (!(await verifyIdToken(token))) {
    return {
      redirect: {
        statusCode: 307,
        destination: "/auth/signin",
      },
    };
  }

  try {
    const users = await prisma.user.findMany();
    return {
      props: {
        users,
      },
    };
  } catch (err) {
    if (err instanceof Error) logError(err);
    throw err;
  }
};
