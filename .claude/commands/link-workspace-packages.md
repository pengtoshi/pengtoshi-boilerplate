# Link Workspace Packages

모노레포에서 패키지 간 의존성을 연결할 때 사용합니다.

사용 시기:
- 새 패키지를 생성/생성한 후 의존성 연결이 필요할 때
- 형제 패키지에서 import 하기 위해 의존성 추가가 필요할 때
- `@org/*` 패키지의 resolution 에러 발생 시 ("cannot find module", "failed to resolve import", "TS2307")

tsconfig paths 수정이나 직접 package.json 편집으로 우회하지 말고, 패키지 매니저의 workspace 명령으로 올바르게 연결합니다.

## 패키지 매니저 감지

루트 `package.json`의 `packageManager` 필드를 확인합니다.

또는 루트의 lockfile로 확인:
- `pnpm-lock.yaml` → pnpm
- `yarn.lock` → yarn
- `bun.lock` / `bun.lockb` → bun
- `package-lock.json` → npm

**이 프로젝트는 yarn을 사용합니다.**

## 워크플로우

1. consumer 패키지 확인 (import 하는 패키지)
2. provider 패키지 확인 (import 되는 패키지)
3. 패키지 매니저의 workspace 문법으로 의존성 추가
4. consumer의 `node_modules/`에 심링크 생성 확인

## yarn (v2+/berry)

`workspace:` 프로토콜을 사용합니다.

```bash
yarn workspace @org/app add @org/ui
```

`package.json` 결과:
```json
{ "dependencies": { "@org/ui": "workspace:^" } }
```

## npm

```bash
npm install @org/ui --workspace @org/app
```

## pnpm

```bash
pnpm add @org/ui --filter @org/app --workspace
```

## bun

```bash
cd packages/app && bun add @org/ui
```

## 디버깅 "Cannot find module"

1. consumer의 `package.json`에 의존성이 선언되어 있는지 확인
2. 없으면 위의 적절한 명령으로 추가
3. install 실행 (`yarn install` 등)

## 주의사항

- 심링크는 `<consumer>/node_modules/@org/<package>`에 생성됩니다
- **호이스팅 방식은 패키지 매니저마다 다릅니다:**
  - npm/bun: 공유 의존성을 루트 `node_modules`에 호이스팅
  - pnpm: 호이스팅 없음 (엄격한 격리)
  - yarn berry: 기본적으로 Plug'n'Play 사용
- 루트 `package.json`에 `"private": true`가 있어야 실수로 publish되지 않습니다
