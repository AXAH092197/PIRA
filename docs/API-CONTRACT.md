# PIRA API Contract — Draft

Base path: /api/v1. All protected routes require authenticated identity and server-validated workspace membership.

GET /me — profile and authorized workspaces
POST /sessions/switch-workspace — switch context after authorization; rotate context and clear caches
POST /sessions/revoke — revoke session
GET /workspaces/{workspaceId}/items — list with pagination, search, tag, sort
POST /workspaces/{workspaceId}/items — create inventory item
GET /workspaces/{workspaceId}/items/{itemId} — retrieve only within workspace
PATCH /workspaces/{workspaceId}/items/{itemId} — update with optimistic concurrency
DELETE /workspaces/{workspaceId}/items/{itemId} — soft delete and audit
GET /workspaces/{workspaceId}/reminders — list reminders
POST /workspaces/{workspaceId}/reminders — create reminder
GET /workspaces/{workspaceId}/audit-events — restricted to authorized roles

Error format: { "error": { "code": "STRING", "message": "Safe description", "requestId": "opaque-id" } }.

Requirements: validation; idempotency for retryable writes; no cross-tenant access; pagination bounds; rate limits; audit sensitive actions. Exact schemas and auth transport are pending stack selection. This file documents intended behavior, not implemented endpoints.
