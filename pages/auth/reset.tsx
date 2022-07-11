import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import React, { useEffect, useState } from "react";
import {
  RequireServerSideAuth,
  SSWithUser,
} from "@lib/wrappers/getServerSidePropsWrappers";
import FormCard from "@components/Forms/AuthFormCard";
import { ResetPasswordForm } from "@components/Forms/Formik/ResetPasswordForm";
import AuthLayout from "layouts/AuthLayout";

const Verify: CustomNextPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <AuthLayout type="reset">
      <div className="relative w-full max-w-md">
        <FormCard>
          <h2>Enter your email</h2>
          <ResetPasswordForm />
        </FormCard>
      </div>
    </AuthLayout>
  );
};

Verify.title = "Reset";
Verify.authRequired = "UNAUTHED";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "UNAUTHED");

export default Verify;
