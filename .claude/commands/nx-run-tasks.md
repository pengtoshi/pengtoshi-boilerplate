# Nx Run Tasks

Nx 워크스페이스에서 빌드, 테스트, lint, serve 등 태스크를 실행할 때 사용합니다.

패키지 매니저가 전역 설치되어 있지 않으면 `yarn nx` 접두사를 사용합니다.

더 자세한 정보는 `--help` 플래그를 사용합니다 (예: `yarn nx run-many --help`).

## 실행 가능한 태스크 확인

```bash
yarn nx show project <projectname> --json
```

`targets` 섹션에서 실행 가능한 타겟을 확인합니다. `project.json` 스크립트만 보면 플러그인에서 추론된 타겟을 놓칠 수 있습니다.

## 단일 태스크 실행

```bash
yarn nx run <project>:<task>
```

`project`는 `package.json` 또는 `project.json`에 정의된 프로젝트 이름입니다.

## 여러 태스크 실행

```bash
yarn nx run-many -t build test lint typecheck
```

`-p` 플래그로 특정 프로젝트 필터, `--exclude`로 제외, `--parallel`로 병렬 수 조정(기본값 3).

예시:
- `yarn nx run-many -t test -p proj1 proj2` — 특정 프로젝트만 테스트
- `yarn nx run-many -t test --projects=*-app --exclude=excluded-app` — 패턴으로 필터
- `yarn nx run-many -t test --projects=tag:api-*` — 태그로 필터

## 영향받은 프로젝트만 실행

변경된 프로젝트와 그에 의존하는 프로젝트에만 태스크를 실행합니다. CI와 대규모 워크스페이스에 유용합니다.

```bash
yarn nx affected -t build test lint
```

기본적으로 베이스 브랜치와 비교합니다. 커스터마이즈:
- `yarn nx affected -t test --base=main --head=HEAD`
- `yarn nx affected -t test --files=libs/mylib/src/index.ts`

## 유용한 플래그

`run`, `run-many`, `affected`에서 모두 사용 가능:

- `--skipNxCache` — 캐시된 결과가 있어도 재실행
- `--verbose` — 스택 트레이스 등 추가 정보 출력
- `--nxBail` — 첫 번째 실패 후 중단
- `--configuration=<name>` — 특정 설정 사용 (예: `production`)
