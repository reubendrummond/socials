import { RegisterForm } from "@components/Forms/RegisterForm";
import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import { AuthLayout } from "layouts/AuthLayout";
import React from "react";

const Register: CustomNextPage = () => {
  return (
    <AuthLayout type="register">
      <RegisterForm />
    </AuthLayout>
  );
};

Register.title = "Register";
Register.authRequired = "UNAUTHED";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "UNAUTHED");

export default Register;
