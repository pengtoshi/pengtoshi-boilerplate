# Nx Generate

Nx 제너레이터로 새 앱/라이브러리 스캐폴딩, 코드 생성, 반복 작업 자동화를 할 때 사용합니다.

## 핵심 원칙

1. **항상 `--no-interactive` 사용** — 실행이 멈추는 것을 방지
2. **제너레이터 소스 코드 읽기** — 스키마만으로는 충분하지 않음; 실제로 무엇을 하는지 이해 필요
3. **기존 패턴 맞추기** — 레포의 유사한 artifact를 보고 컨벤션 따르기
4. **lint/test/build/typecheck로 검증** — 생성된 코드는 검증을 통과해야 함

## 단계

### 1. 사용 가능한 제너레이터 탐색

```bash
# 플러그인의 제너레이터 나열
yarn nx list @nx/react

# 사용 가능한 플러그인 보기
yarn nx list
```

### 2. 제너레이터 선택

로컬 워크스페이스 제너레이터와 외부 플러그인 제너레이터 모두 사용 가능한 경우, **항상 로컬 워크스페이스 제너레이터를 우선**합니다. 로컬 제너레이터는 해당 레포의 패턴에 맞게 커스터마이즈되어 있습니다.

### 3. 제너레이터 옵션 확인

```bash
yarn nx g @nx/react:library --help
```

### 라이브러리 빌드 가능 여부

**기본적으로 non-buildable 라이브러리**를 사용합니다 (특별한 이유가 없으면).

| 타입 | 사용 시기 | 플래그 |
|------|-----------|--------|
| **Non-buildable** (기본) | 앱이 내부적으로 사용하는 모노레포 라이브러리 | `--bundler` 없음 |
| **Buildable** | npm 배포, 레포 간 공유, 안정적 라이브러리 | `--bundler=vite` 또는 `--bundler=swc` |

### 4. 제너레이터 소스 코드 읽기

**이 단계가 중요합니다.** 소스 코드를 통해:
- 정확히 어떤 파일이 생성/수정되는지 알 수 있음
- 사이드 이펙트(설정 업데이트, 의존성 설치 등) 파악
- 스키마에서 명확하지 않은 동작 이해

```bash
# 플러그인 제너레이터 소스 찾기
node -e "console.log(require.resolve('@nx/<plugin>/generators.json'));"

# 또는 직접 읽기
cat node_modules/<plugin>/generators.json
```

> **⚠️ `--directory` 플래그 주의**
> 디렉토리는 부모 경로가 아닌 생성될 라이브러리의 전체 경로를 지정합니다.
> ```bash
> # ✅ 올바른 방법
> yarn nx g @nx/react:library --directory=libs/my-lib
>
> # ❌ 잘못된 방법
> yarn nx g @nx/react:library --name=my-lib --directory=libs
> ```

### 5. 기존 패턴 확인

생성 전, 기존 유사한 artifact를 살펴봅니다:
- 네이밍 컨벤션, 파일 구조, 설정 패턴
- 어떤 테스트 러너, 빌드 도구, linter를 사용하는지

### 6. Dry-run으로 파일 위치 검증

**항상 먼저 `--dry-run`으로 실행**해 파일이 올바른 위치에 생성되는지 확인합니다:

```bash
yarn nx g @nx/react:library --name=my-lib --dry-run --no-interactive
```

### 7. 제너레이터 실행

```bash
yarn nx generate <generator-name> <options> --no-interactive
```

새 패키지는 보통 워크스페이스 의존성 연결이 필요합니다. `/link-workspace-packages`를 참고하세요.

### 8. 생성된 코드 수정 (필요 시)

생성된 코드는 시작점입니다. 필요에 따라 수정합니다.

**중요:** 생성된 테스트 파일(`*.spec.ts`)을 삭제하거나 교체할 경우, 의미 있는 대체 테스트를 작성하거나 프로젝트 설정에서 `test` 타겟을 제거하세요. 빈 테스트 스위트는 `nx test`를 실패하게 만듭니다.

### 9. 포맷 및 검증

```bash
# 포맷
yarn nx format --fix

# 검증 (이 타겟들은 예시입니다)
yarn nx run-many -t build,lint,test,typecheck
```

CI 설정을 참고해 어떤 타겟이 중요한지 확인하세요.

검증 실패 시 관리 가능한 문제(lint 에러 몇 개, 경미한 타입 문제)는 수정합니다. 문제가 광범위하면 생성된 것, 실패 내용, 시도한 것을 사용자에게 알립니다.
