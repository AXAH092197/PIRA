# Preliminary Data Model (Design Only)

- User: id, verified_email, credential_version, status, created_at.
- Workspace: id, type (personal|business), owner_user_id, name, created_at.
- Membership: workspace_id, user_id, role, status; unique workspace/user pair.
- Session: id, user_id, auth_strength, idle_expires_at, absolute_expires_at, revoked_at.
- SessionWorkspace: session_id, workspace_id, selected_at; validated against membership.
- InventoryItem: id, workspace_id, created_by, name, quantity, metadata, updated_at, deleted_at.
- Tag: id, workspace_id, name.
- ItemTag: item_id, tag_id, workspace_id; enforce matching workspace.
- Reminder: id, workspace_id, item_id?, schedule, timezone, state.
- AuditEvent: id, workspace_id?, actor_user_id?, action, resource_type, resource_id, timestamp, outcome.
- Subscription: id, workspace_id, plan, status, external_reference.

IDs and timestamps are conceptual. Choose types, constraints, and migrations after database selection. Tenant-scoped queries and foreign keys must prevent cross-workspace association. Audit retention and deletion policies require approval.
