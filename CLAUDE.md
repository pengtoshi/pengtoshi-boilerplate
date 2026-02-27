# Project: pengtoshi-boilerplate

## Package Manager

This project uses **yarn** (yarn.lock 존재). 모든 install/workspace 명령에 yarn을 사용합니다.

## Monorepo Structure (Nx)

- `apps/client-expo` — React Native / Expo 모바일 앱
- `apps/client-next` — Next.js 웹 앱
- `apps/server-nest` — NestJS 백엔드
- `libs/ui/mobile` — 모바일 UI 컴포넌트 (`@libs/ui-mobile`)
- `libs/ui/web` — 웹 UI 컴포넌트
- `libs/graphql` — GraphQL 클라이언트
- `libs/model` — 공유 데이터 모델

## UI 디자인 시스템 공통 원칙

### `libs/ui` 우선 사용

- 새 UI를 만들 때 RN/DOM 기본 컴포넌트(`Text`, `Button`, `Modal`, `View`, `div` 등)를 직접 스타일링하기 전에 항상 `libs/ui/mobile`, `libs/ui/web`에 이미 있는 컴포넌트를 먼저 찾습니다.
- 공통 패턴(토스트, 모달, 바텀시트, 인풋, 버튼 등)은 앱 레벨에서 새로 만들지 않습니다.

### Tailwind 토큰 우선 사용

- 색상, 타이포, 간격은 `@libs/ui/tailwind`에서 정의한 토큰 클래스를 우선 사용합니다.
- ❌ BAD: `<Text className="text-[13px] text-[#FF0000] mt-[3px]">내용</Text>`
- ✅ GOOD: `<Text className="text-14/body text-status-negative mt-1">내용</Text>`

### 새 디자인 토큰 추가

- 새로운 색상/타이포/spacing이 필요하면 `base.js` / `mobile.preset.js` / `web.preset.js` 중 적절한 preset에 토큰을 먼저 추가하고, 컴포넌트/앱 코드에서는 해당 토큰 클래스만 사용합니다.

### 상태 전환 애니메이션 일관성

- hover, pressed, active 등 상태 전환에는 `transition-colors duration-300`을 기본으로 사용합니다.
- 웹/모바일 모두 색상 전환 시간은 200~300ms 범위로 유지합니다.

## Nx Commands

Nx 태스크 실행 시 yarn 접두사를 사용합니다.

```bash
# 단일 태스크
yarn nx run <project>:<task>

# 여러 태스크
yarn nx run-many -t build test lint typecheck

# 영향받은 프로젝트만
yarn nx affected -t build test lint

# 프로젝트 목록
yarn nx show projects

# 프로젝트 설정 확인
yarn nx show project <name> --json
```

`project.json`을 직접 읽지 말고, `nx show project <name> --json`으로 완전한 설정을 확인합니다.

## Custom Slash Commands

- `/monitor-ci` — Nx Cloud CI 모니터링 및 자동 수정
- `/nx-workspace` — Nx 워크스페이스 탐색
- `/nx-run-tasks` — Nx 태스크 실행
- `/nx-generate` — Nx 제너레이터로 코드 생성
- `/nx-plugins` — Nx 플러그인 관리
- `/link-workspace-packages` — 워크스페이스 패키지 연결
