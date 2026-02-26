import type { InferGetServerSidePropsType } from "next";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { Main } from "../../layouts/Main/Main";
import { withAuthServerSideProps } from "../../utils/auth";

/**
 * 새 페이지 작성 예시
 *
 * 1. getServerSideProps = withAuthServerSideProps()
 *    - 인증되지 않은 사용자는 자동으로 /login 으로 리다이렉트됩니다.
 *    - 추가 데이터 페칭이 필요 없는 경우 인자 없이 호출합니다.
 *
 * 2. getServerSideProps = withAuthServerSideProps(async (context) => { ... })
 *    - 인증 확인 후 async 함수가 실행됩니다.
 *    - context.query / context.params 로 라우트 파라미터에 접근합니다.
 *    - { notFound: true } 반환 시 404 페이지로 이동합니다.
 *    - 반환한 props 는 InferGetServerSidePropsType 으로 타입 추론됩니다.
 *
 * 3. useRequireAuth()
 *    - 클라이언트 사이드에서 세션을 재검증합니다.
 *    - 토큰이 만료됐으면 자동으로 /login 으로 리다이렉트됩니다.
 *    - viewer: 현재 로그인한 유저 정보
 *    - isCheckingSession: 세션 검증 중 여부
 */

export const getServerSideProps = withAuthServerSideProps(async () => {
  // 예: 서버에서 데이터를 조회합니다.
  // const data = await fetchExampleData(id);
  // if (!data) return { notFound: true };

  return {
    props: {
      // data,
    },
  };
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const ExampleScreen = () => {
  const { viewer, isCheckingSession } = useRequireAuth();

  if (isCheckingSession) return null;

  return (
    <div className="flex w-full flex-col px-16 py-12">
      <div className="flex flex-col items-start gap-6">
        <div className="text-20/heading text-label-normal dark:text-dark-label-normal">예시 메뉴 페이지</div>
        <div className="text-16/body text-label-assertive dark:text-dark-label-assertive">
          현재 {viewer?.role} 권한 사용자
        </div>
      </div>
    </div>
  );
};

const ExamplePage = (props: Props) => {
  return (
    <Main>
      <ExampleScreen {...props} />
    </Main>
  );
};

export default ExamplePage;
