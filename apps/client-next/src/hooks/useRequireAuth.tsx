import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthTokenManager, useLazyFindUser } from "@libs/graphql-next";
import type { User } from "@libs/graphql-next";

export const useRequireAuth = () => {
  const router = useRouter();
  const [findUser] = useLazyFindUser();
  const [viewer, setViewer] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    findUser({ fetchPolicy: "network-only" })
      .then((result) => {
        const user = result.data?.findUser;
        if (!user) throw new Error("USER_NOT_FOUND");
        setViewer(user);
      })
      .catch(() => {
        AuthTokenManager.removeToken();
        router.replace("/login?error=SESSION_EXPIRED");
      })
      .finally(() => {
        setIsCheckingSession(false);
      });
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return { viewer, isCheckingSession };
};
