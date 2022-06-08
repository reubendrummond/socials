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

interface UserProps {
  users: User[];
}

const Display = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // useAuth({ redirect: "/auth/signin", requiredRole: "ADMIN" });
  const { users } = props;
  // console.log(users);
  return (
    <MainLayout>
      {users ? (
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

export default Display;

export const getServerSideProps = RequireServerSideAuth<UserProps>(
  async (context) => {
    return {
      props: {
        users: [
          {
            id: 1,
            name: "test",
            email: "test",
            age: 12,
            role: "USER",
            title: "Lord",
          },
        ],
      },
    };
  },
  "USER"
);
