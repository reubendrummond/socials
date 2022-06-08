import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import { useRouter } from "next/router";
import React from "react";

const SignIn: CustomNextPage = () => {
  const { signInWithGoogle, isSubmitting } = useAuth();
  const router = useRouter();
  const onSuccess = () => {
    const next = router.query.next as string;

    if (next) router.replace("/" + next);
    else router.replace("/display");
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

SignIn.title = "Sign In";
SignIn.layout = "main";
SignIn.authRequired = "UNAUTHED";

export default SignIn;
