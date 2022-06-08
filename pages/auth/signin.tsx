import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import { useRouter } from "next/router";
import React from "react";

const SignIn: CustomNextPage = () => {
  const { signInWithGoogle, isSubmitting } = useAuth();

  return (
    <div>
      <button onClick={() => signInWithGoogle()} disabled={isSubmitting}>
        Sign in with Google
      </button>
    </div>
  );
};

SignIn.title = "Sign In";
SignIn.layout = "main";
SignIn.authRequired = "UNAUTHED";

export default SignIn;
