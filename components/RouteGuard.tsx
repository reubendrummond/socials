import { AfterLoginPage, AuthRequiredOptions, LoginPage } from "@lib/constants";
import { useAuth } from "@lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import PageLoader from "./Loaders/Page";

export const ProtectedRoute = ({
  children,
  authRequired,
}: {
  children: ReactNode;
  authRequired?: AuthRequiredOptions;
}) => {
  const { user, isAuthenticating } = useAuth();
  const router = useRouter();
  useEffect(() => {
    console.log(
      "auth req",
      authRequired,
      isAuthenticating,
      router,
      authRequired
    );
    console.table([authRequired, user?.displayName, isAuthenticating]);

    // page doesn't require authentication
    if (!authRequired) return;

    // page requires unauthenticated state
    if (user && authRequired === "UNAUTHED") {
      // later: go to 'from' if exists else:
      router.replace(AfterLoginPage);
      return;
    }

    // wait to finish authenticating
    if (isAuthenticating) return;

    // page requires authentication
    if (!user && authRequired) {
      router.replace(LoginPage);
      return;
    }
  }, [user, isAuthenticating, authRequired]);

  if (isAuthenticating) return <PageLoader />;

  return <>{children}</>;
};
