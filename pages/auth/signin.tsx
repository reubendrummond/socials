import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import { useRouter } from "next/router";
import React from "react";

const SignIn: CustomNextPage = () => {
  const { signInWithGoogle, isSubmitting } = useAuth();
  const router = useRouter();
  const onSuccess = () => {
    router.push("/display");
  };

  return (
    <div>
      <button
        onClick={() => signInWithGoogle(onSuccess)}
        disabled={isSubmitting}
      >
        Sign in with Google
      </button>
    </div>
  );
};

SignIn.layout = "main";

export default SignIn;
