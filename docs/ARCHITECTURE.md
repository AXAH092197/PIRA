# PIRA Architecture — Draft v0.1

PIRA (Personal Inventory & Reminder Application) is planned as a responsive inventory, reminder, and reporting platform with personal and business workspaces.

## Planned modules
- Identity: verified email, secure sign-in, MFA enrollment and recovery.
- Workspaces: personal and business contexts with independent authorization boundaries.
- Inventory: items, profiles, tags, search, sorting, and eventual bulk import.
- Reminders: scheduled notifications with per-workspace settings.
- Reporting: filtered inventory summaries and export with explicit authorization.
- Billing: Basic, Access, and Business entitlements; exact tier boundaries pending approval.
- Administration: scoped audit records, account management, and programmer-only operational access.

## Session and workspace model
- Users may choose a single signed-in session with explicit workspace switching, or separate isolated sessions, through Settings.
- Every API request must carry a server-validated workspace context; switching the UI alone never grants access.
- Sessions have configurable idle and absolute expiration subject to security minimums and server policy.
- Sensitive operations require step-up authentication and permissions are checked server-side.
- Business membership and roles are independent of personal workspace ownership.
- Workspace switches must clear cached sensitive data and invalidate or segregate in-flight requests.

## Implementation boundaries
Start with modular application layers: UI, API, identity/authorization, inventory, reminders, reporting, billing, and persistence. Select a specific framework/database only after reviewing existing PIRA source and deployment constraints. No unreviewed external AI, telemetry, payment, or notification SDKs should be added.

## Nonfunctional requirements
Responsive accessibility; least privilege; encrypted transport; secrets management; auditability; testable business rules; data export/deletion policy; error handling; rate limiting; backups and recovery. Never log passwords, MFA tokens, payment details, or raw session tokens.

## Open decisions
Hosting, stack, data residency, retention periods, precise plan entitlements, MFA recovery, payment processor, reminder delivery channels, and migration from original project.
