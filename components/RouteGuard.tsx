import {
  AFTER_SIGNIN_PAGE,
  AuthRequiredOptions,
  SIGNIN_PAGE,
} from "@lib/constants";
import usePush from "@lib/hooks/usePush";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const push = usePush();
  useEffect(() => {
    // page doesn't require authentication
    if (!authRequired) return;

    // wait to finish authenticating
    if (status === "loading") return;

    // page requires unauthenticated state
    if (status === "authenticated" && authRequired === "UNAUTHED") {
      // later: go to 'from' if exists else:
      const next = router.query.next as string;
      if (next) push("/" + next);
      else push(AFTER_SIGNIN_PAGE);
      return;
    }

    // page requires authentication
    if (
      status === "unauthenticated" &&
      authRequired &&
      authRequired !== "UNAUTHED"
    ) {
      console.log("here");
      push(SIGNIN_PAGE);
      return;
    }
  }, [session, status, authRequired, push, router]);

  if (strict && authRequired && status === "loading") return <PageLoader />;

  return <>{children}</>;
};
