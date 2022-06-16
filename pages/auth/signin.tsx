import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import MainLayout from "layouts/MainLayout";
import React from "react";
import { GoogleLoginButton } from "@components/thirdPartyAuthButtons/GoogleLoginButton";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import { SignInForm } from "@components/Forms/SignInForm";

const SignIn: CustomNextPage = () => {
  const { signInWithGoogle, isSubmitting, user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-md mx-auto px-12 py-8 rounded-xl bg-gray-200 dark:bg-gray-900 flex flex-col gap-y-4 justify-center">
        <h2 className="text-center">Sign In</h2>
        <div className="flex flex-col justify-center">
          <GoogleLoginButton
            onClick={() => signInWithGoogle()}
            disabled={Boolean(user || isSubmitting)}
          />
          {/* another login provider? */}
        </div>
        <div className="flex w-fit self-center items-center gap-x-1">
          <div className="h-[1px] w-[10px] bg-white" />
          <p className="bg-inherit">OR</p>
          <div className="h-[1px] w-[10px] bg-white" />
          {/* <div className="absolute h-[1px] w-[40px] bg-white top-[50%] left-[-10px]" /> */}
        </div>
        <div>
          <SignInForm />
        </div>
      </div>
    </MainLayout>
  );
};

SignIn.title = "Sign In";
SignIn.authRequired = "UNAUTHED";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "UNAUTHED");

export default SignIn;
