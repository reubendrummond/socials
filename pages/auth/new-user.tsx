import { NewUserForm } from "@components/Forms/NewUserForm";
import { AFTER_SIGNIN_PAGE, SIGNIN_PAGE } from "@lib/constants";
import { SSWithUser } from "@lib/wrappers/SSAuth";
import MainLayout from "layouts/MainLayout";
import React from "react";

const NewUser = () => {
  return (
    <MainLayout>
      <div className="px-8 py-6 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-lg max-w-md w-full mx-auto">
        <NewUserForm />
      </div>
    </MainLayout>
  );
};

export default NewUser;

export const getServerSideProps = SSWithUser(async (context) => {
  const user = context.session.user;

  if (!user)
    return {
      redirect: {
        destination: SIGNIN_PAGE,
        permanent: false,
      },
    };

  // user has selected username
  if (user.username)
    return {
      redirect: {
        destination: AFTER_SIGNIN_PAGE,
        permanent: true,
      },
    };

  return {
    props: {},
  };
});
