import { AfterLoginPage, AuthRequiredOptions, LoginPage } from "@lib/constants";
import { useAuth } from "@lib/hooks/useAuth";
import usePush from "@lib/hooks/usePush";
import { Role } from "@prisma/client";
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
  const push = usePush();
  useEffect(() => {
    // console.log(
    //   "auth req",
    //   authRequired,
    //   isAuthenticating,
    //   router,
    //   authRequired
    // );
    console.log("route guarding");

    // page doesn't require authentication
    if (!authRequired) return;

    // wait to finish authenticating
    if (isAuthenticating) return;

    // page requires unauthenticated state
    if (user && authRequired === "UNAUTHED") {
      // later: go to 'from' if exists else:
      const next = router.query.next as string;
      if (next) push("/" + next);
      else push(AfterLoginPage);
      return;
    }

    // page requires authentication
    if (!user && authRequired && authRequired !== "UNAUTHED") {
      push(LoginPage);
      return;
    }
  }, [user, isAuthenticating, authRequired, push, router]);

  if (isAuthenticating) return <PageLoader />;

  return <>{children}</>;
};
