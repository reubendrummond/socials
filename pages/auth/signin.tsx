import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import AuthLayout from "layouts/AuthLayout";
import React, { useEffect } from "react";
import { GoogleLoginButton } from "@components/thirdPartyAuthButtons/GoogleLoginButton";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import { SignInForm } from "@components/Forms/SignInForm";
import FormCard from "@components/Forms/FormCard";
import { signIn, useSession, signOut } from "next-auth/react";

const SignIn: CustomNextPage = () => {
  const { signInWithGoogle, isSubmitting, user } = useAuth();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("session", session);
    console.log("status", status);
  }, [session, status]);

  return (
    <AuthLayout type="signin">
      <div className="relative w-full max-w-sm">
        <div className="absolute bg-primary-dark w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-lg animate-blob animation-delay-2000 opacity-50 -right-12 -top-14" />
        <div className="absolute bg-primary w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-lg animate-blob animation-delay-4000 opacity-60 bottom-6 -left-16" />
        <div className="absolute bg-primary-light w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-lg animate-blob opacity-50 -bottom-14 -right-20" />
        <FormCard>
          <h2 className="text-center font-semibold">Sign In</h2>
          <div className="flex flex-col justify-center">
            <GoogleLoginButton
              onClick={() => signInWithGoogle()}
              disabled={Boolean(user || isSubmitting)}
            />
            {/* another login provider? */}
          </div>
          <div className="flex w-fit self-center items-center gap-x-1">
            <div className="h-[1px] w-[20px] bg-gray-500" />
            <p className="text-gray-500">OR</p>
            <div className="h-[1px] w-[20px] bg-gray-500" />
            {/* <div className="absolute h-[1px] w-[40px] bg-white top-[50%] left-[-10px]" /> */}
          </div>
          <div>
            <SignInForm />
          </div>
          <div></div>
        </FormCard>
      </div>
      <button
        onClick={() =>
          signIn("github", { callbackUrl: "/feed" })
            .then((r) => {
              console.log(JSON.stringify(r));
            })
            .catch((err) => {
              console.log(err);
            })
        }
        className="relative"
      >
        GitHub
      </button>
      <button onClick={() => signOut()}>Sign out</button>
    </AuthLayout>
  );
};

SignIn.title = "Sign In";
SignIn.authRequired = "UNAUTHED";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "UNAUTHED");

export default SignIn;
