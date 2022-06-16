import { AfterLoginPage, AuthRequiredOptions, LoginPage } from "@lib/constants";
import { useAuth } from "@lib/hooks/useAuth";
import usePush from "@lib/hooks/usePush";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import PageLoader from "./Loaders/Page";

// strict true will not allow flashes of content but loader html will be sent
export const RouteGuard = ({
  children,
  authRequired,
  strict = false,
}: {
  children: ReactNode;
  authRequired?: AuthRequiredOptions;
  strict: boolean;
}) => {
  const { user, isAuthenticating } = useAuth();
  const router = useRouter();
  const push = usePush();
  useEffect(() => {
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

  if (strict && authRequired && isAuthenticating) return <PageLoader />;

  return <>{children}</>;
};
