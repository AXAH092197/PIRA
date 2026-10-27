# Session and Workspace Security Specification (Draft)

## User settings
Session mode: shared login with workspace switch OR separately isolated sessions. Changing modes requires reauthentication and session rotation.

## Authorization
A selected workspace is never trusted merely because the client sends its ID. Verify active membership, role, and object ownership on every request. Never accept client-provided permissions as authority.

## Expiration
Support server-enforced idle and absolute expiration; exact durations are configuration decisions requiring risk review. Revocation must invalidate sessions immediately. Use step-up authentication for high-risk changes, exports, and privileged operations.

## Switching
Before rendering another workspace, clear or partition sensitive caches, abort stale requests, verify membership, and load the authorized context. Reject stale mutation requests that target a previous workspace.

## Test cases
- Personal account cannot read another user's personal inventory.
- Business member cannot read unrelated businesses.
- Revoked membership blocks subsequent requests.
- Expired and revoked sessions fail.
- Switching workspace cannot reuse stale cached content.
- Lower privilege cannot grant itself higher privileges.
- Session-mode changes rotate credentials.
