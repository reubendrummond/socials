import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import MainLayout from "layouts/MainLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SignIn: CustomNextPage = () => {
  const { signInWithGoogle, isSubmitting } = useAuth();

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <MainLayout>
      <div>
        <button onClick={() => signInWithGoogle()} disabled={isSubmitting}>
          Sign in with Google
        </button>
      </div>
    </MainLayout>
  );
};

SignIn.title = "Sign In";
// SignIn.layout = "main";
SignIn.authRequired = "UNAUTHED";

export default SignIn;
