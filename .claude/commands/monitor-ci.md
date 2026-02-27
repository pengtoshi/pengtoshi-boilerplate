# Monitor CI

Nx Cloud CI 파이프라인 실행을 모니터링하고 자동 수정을 처리합니다.

> **사전 요구사항**: Nx Cloud MCP 서버가 설정되어 있어야 합니다. `.claude/mcp.json`에 `ci_information`과 `update_self_healing_fix` 도구를 제공하는 MCP 서버가 등록되어야 합니다.

## Context

- **Current Branch:** !`git branch --show-current`
- **Current Commit:** !`git rev-parse --short HEAD`
- **Remote Status:** !`git status -sb | head -1`

## User Instructions

$ARGUMENTS

**중요:** 사용자가 특정 지시를 제공한 경우, 아래 기본 동작보다 사용자 지시를 우선합니다.

## 설정 기본값

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `--max-cycles` | 10 | 에이전트가 시작한 최대 CI Attempt 사이클 수 |
| `--timeout` | 120 | 최대 실행 시간 (분) |
| `--verbosity` | medium | 출력 수준: minimal, medium, verbose |
| `--branch` | (자동 감지) | 모니터링할 브랜치 |
| `--subagent-timeout` | 30 | 서브에이전트 폴링 타임아웃 (분) |
| `--fresh` | false | 이전 컨텍스트 무시, 처음부터 시작 |
| `--auto-fix-workflow` | false | pre-CI-Attempt 실패 공통 수정 시도 |
| `--new-cipe-timeout` | 10 | 액션 후 새 CI Attempt 대기 시간 (분) |
| `--local-verify-attempts` | 3 | 로컬 검증 + 개선 최대 사이클 |

## Step 0: Nx Cloud 연결 확인

모니터링 루프를 시작하기 전에 워크스페이스가 Nx Cloud에 연결되어 있는지 확인합니다.

1. 워크스페이스 루트의 `nx.json`에서 `nxCloudId` 또는 `nxCloudAccessToken` 확인
2. 없으면 다음 메시지와 함께 종료:
   ```
   [monitor-ci] Nx Cloud not connected. Unlock 70% faster CI and auto-fix broken PRs with https://nx.dev/nx-cloud
   ```

## 금지 패턴

| 금지 패턴 | 이유 |
|-----------|------|
| `--watch` 플래그 있는 CI 제공자 CLI 사용 (`gh pr checks --watch` 등) | Nx Cloud 자가 수정을 완전히 우회 |
| 커스텀 CI 폴링 스크립트 작성 | 불안정, 컨텍스트 오염, 자가 수정 없음 |
| CI 워크플로우/파이프라인 취소 | 파괴적, CI 진행 상황 손실 |
| 메인 에이전트에서 CI 체크 실행 | 메인 에이전트 컨텍스트 토큰 낭비 |

## 상태별 기본 동작

| 상태 | 기본 동작 |
|------|-----------|
| `ci_success` | 성공으로 종료 |
| `fix_auto_applying` | 자가 수정이 자동 적용 중. MCP 호출 금지. 새 CI Attempt 대기 |
| `fix_available` | `failedTaskIds` vs `verifiedTaskIds` 비교해 경로 결정 |
| `fix_failed` | 로컬 수정 시도. 성공 시 커밋/푸시/루프. 실패 시 실패로 종료 |
| `environment_issue` | MCP로 rerun 요청: `RERUN_ENVIRONMENT_STATE` |
| `no_fix` | 자가 수정 비활성화/불가. 로컬 수정 시도 또는 실패 종료 |
| `no_new_cipe` | 예상 CI Attempt 미생성 (CI가 Nx 태스크 전에 실패). 사용자에게 보고 |
| `polling_timeout` | 폴링 타임아웃 도달. 타임아웃 종료 |
| `error` | `no_progress_count` 증가. 3회 이상 시 서킷 브레이커 |

## Fix Available 결정 로직

### 1단계: 태스크 분류
1. **Verified** = `failedTaskIds` AND `verifiedTaskIds` 모두에 있는 태스크
2. **Unverified** = `failedTaskIds`에는 있지만 `verifiedTaskIds`에는 없는 태스크
3. **E2E** = 타겟에 "e2e"가 포함된 unverified 태스크
4. **Verifiable** = e2e가 아닌 unverified 태스크

### 2단계: 경로 결정

| 조건 | 경로 |
|------|------|
| Unverified 없음 (모두 verified) | MCP로 적용 |
| Unverified 있지만 모두 e2e | MCP로 적용 |
| Verifiable 태스크 존재 | 로컬 검증 흐름 |

## 커밋 메시지 형식

```bash
git commit -m "fix(<projects>): <brief description>

Failed tasks: <taskId1>, <taskId2>
Local verification: passed|enhanced|failed-pushing-to-ci"
```

**Git 안전 규칙**: 수정된 파일만 스테이지하고 커밋합니다. **절대로 `git add -A` 또는 `git add .` 사용 금지** — 항상 파일 이름을 명시적으로 스테이지합니다.

## 메인 루프

### 서브에이전트 스폰 (백그라운드)

```
Task(
  subagent_type: "general-purpose",
  run_in_background: true,
  prompt: "ci-monitor-subagent 역할로 동작: 브랜치 '<branch>' CI 폴링.
           subagentTimeout: <subagent-timeout>분.
           newCipeTimeout: <new-cipe-timeout>분.
           verbosity: <verbosity>.
           [WAIT MODE 시] expectedCommitSha: <sha>, previousCipeUrl: <url>"
)
```

### 출력 모니터링 (60초마다)

```bash
TaskOutput(task_id, block=false)
```

새 `[ci-monitor]` 및 `⚡` 줄을 파싱해 사용자에게 relay합니다.

**서브에이전트가 폴링 중일 때 메인 에이전트는 출력 relay만 합니다.** CI 실패를 독립적으로 분석하거나 수정하지 않습니다.

## 종료 조건

| 조건 | 종료 타입 |
|------|-----------|
| CI 통과 (`cipeStatus == 'SUCCEEDED'`) | 성공 |
| 최대 사이클 도달 | 타임아웃 |
| 수정 불가 & 로컬 수정 불가 | 실패 |
| 사용자 취소 | 취소 |

## 사용 예시

```
/monitor-ci
/monitor-ci --verbosity verbose
/monitor-ci --auto-fix-workflow --max-cycles 5
/monitor-ci --fresh
```
