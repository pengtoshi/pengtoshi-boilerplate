# Nx Workspace Exploration

Nx 워크스페이스 구조, 프로젝트 설정, 사용 가능한 타겟 및 의존성을 파악할 때 사용합니다.

패키지 매니저가 전역 설치되어 있지 않으면 `yarn nx` 접두사를 사용합니다. lockfile을 확인해 패키지 매니저를 결정하세요.

## 프로젝트 목록

`nx show projects`로 프로젝트를 나열합니다.

필터 문법(`-p`/`--projects`)은 `nx run-many`, `nx release`, `nx show projects` 등 여러 Nx 명령에서 사용할 수 있습니다. 명시적 이름, glob 패턴, 태그 참조(`tag:name`), 디렉토리, 부정(`!project-name`)을 지원합니다.

```bash
# 모든 프로젝트 나열
yarn nx show projects

# 패턴으로 필터
yarn nx show projects --projects "apps/*"

# 태그로 필터
yarn nx show projects --projects "tag:publishable"

# 특정 타겟이 있는 프로젝트
yarn nx show projects --withTarget build

# 복합 필터
yarn nx show projects --type lib --withTarget test

# JSON 출력
yarn nx show projects --json
```

## 프로젝트 설정

`nx show project <name> --json`으로 완전한 설정을 확인합니다.

**중요**: `project.json`을 직접 읽지 마세요 — 부분 설정만 포함합니다. `nx show project --json`이 플러그인에서 추론된 타겟을 포함한 완전한 설정을 반환합니다.

```bash
# 전체 프로젝트 설정
yarn nx show project my-app --json

# 특정 부분 추출
yarn nx show project my-app --json | jq '.targets'
yarn nx show project my-app --json | jq '.targets | keys'
yarn nx show project my-app --json | jq '{name, root, sourceRoot, projectType, tags}'
```

## 타겟 정보

```bash
# 프로젝트의 모든 타겟 목록
yarn nx show project my-app --json | jq '.targets | keys'

# 특정 타겟 설정 확인
yarn nx show project my-app --json | jq '.targets.build'

# 타겟 executor/command
yarn nx show project my-app --json | jq '.targets.build.executor'

# 타겟 옵션
yarn nx show project my-app --json | jq '.targets.build.options'

# 특정 타겟이 있는 프로젝트 찾기
yarn nx show projects --withTarget serve
```

## 워크스페이스 설정

`nx.json`을 직접 읽어 워크스페이스 레벨 설정을 확인합니다.

```bash
cat nx.json | jq '.targetDefaults'
cat nx.json | jq '.namedInputs'
cat nx.json | jq '.plugins'
```

## 프로젝트 그래프

```bash
# 그래프 출력
yarn nx graph --print

# 프로젝트 의존성 확인
yarn nx graph --print | jq '.graph.dependencies["my-app"]'

# 특정 라이브러리에 의존하는 프로젝트 찾기
yarn nx graph --print | jq '.graph.dependencies | to_entries[] | select(.value[].target == "shared-ui") | .key'
```

## 영향받은 프로젝트

```bash
yarn nx show projects --affected --json
yarn nx affected -t build test lint
```

## 트러블슈팅

```bash
# 워크스페이스 동기화
yarn nx sync
yarn nx reset  # 캐시 문제 시

# 태스크를 찾을 수 없는 경우
yarn nx show project X --json | jq '.targets | keys'
```

## 프로그래밍 방식 답변

nx CLI 결과를 처리할 때 수동으로 파싱하지 말고 `--json` 플래그와 `jq`를 사용합니다.

```bash
# 프로젝트 수 세기
yarn nx show projects --json | jq 'length'

# 패턴으로 필터
yarn nx show projects --json | jq '.[] | select(startswith("shared-"))'
```
