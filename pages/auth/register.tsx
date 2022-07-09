import FormCard from "@components/Forms/AuthFormCard";
import { RegisterForm } from "@components/Forms/Formik/RegisterForm";
import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import AuthLayout from "layouts/AuthLayout";
import React from "react";

const Register: CustomNextPage = () => {
  return (
    <AuthLayout type="register">
      <div className="relative w-full max-w-sm">
        <div className="absolute bg-primary-dark w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-lg animate-blob animation-delay-2000 opacity-50 -right-12 -top-14" />
        <div className="absolute bg-primary w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-lg animate-blob animation-delay-4000 opacity-60 bottom-6 -left-16" />
        <div className="absolute bg-primary-light w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-lg animate-blob opacity-50 -bottom-14 -right-20" />
        <FormCard>
          <h2 className="text-center font-semibold">Register</h2>

          <RegisterForm />
        </FormCard>
      </div>
    </AuthLayout>
  );
};

Register.title = "Register";
Register.authRequired = "UNAUTHED";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "UNAUTHED");

export default Register;
