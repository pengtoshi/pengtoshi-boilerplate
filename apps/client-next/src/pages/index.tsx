import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AuthTokenManager, useSignOut } from "@libs/graphql-next";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Main } from "../layouts/Main/Main";
import { withAuthServerSideProps } from "../utils/auth";

const AdminScreen = () => {
  const router = useRouter();
  const { viewer } = useRequireAuth();
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [signOutMutation] = useSignOut();

  const handleSignOut = useCallback(async () => {
    try {
      await signOutMutation();
    } catch {
      // Ignore API signOut failure and force cookie cleanup below.
    } finally {
      AuthTokenManager.removeToken();
      await router.replace("/login");
    }
  }, [router, signOutMutation]);

  useEffect(() => {
    if (!router.isReady) return;
    const queryError = router.query.error;
    if (typeof queryError === "string") {
      setSessionError(queryError);
      return;
    }
    setSessionError(null);
  }, [router.isReady, router.query.error]);

  return (
    <div className="flex w-full flex-col px-16 py-12">
      <div className="flex flex-col items-start gap-6">
        <div className="text-20/heading text-label-normal dark:text-dark-label-normal">홈 화면</div>
        <div className="text-16/body text-label-assertive dark:text-dark-label-assertive">
          이곳에 홈 화면 구성 요소를 넣어주세요.
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthServerSideProps();

const Home = () => {
  return (
    <Main>
      <AdminScreen />
    </Main>
  );
};

export default Home;
