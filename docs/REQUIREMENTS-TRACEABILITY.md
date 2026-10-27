# PIRA Requirements Traceability Matrix
Version 0.1 | 2026-10-27
Legend: SPEC=approved specification; CODE=isolated code committed; INTEGRATED=working application integration; TESTED=tests executed and verified. No item currently qualifies as INTEGRATED or TESTED.

| ID | Historical / current origin | Current requirement | Source of authority | Implementation evidence | Validation needed | Status |
|---|---|---|---|---|---|---|
| R-01 | IT499 inventory profiles/index | Item CRUD, profiles, quantities, categories, location, search and sort | REQUIREMENTS-AUTHORITY.md; SOURCE-AUDIT-2026-10-27.md | None verified | CRUD and ownership tests | SPEC |
| R-02 | IT499 reminders/reorder | Low-stock alerts, reminders and reorder workflows | REQUIREMENTS-AUTHORITY.md | None verified | Scheduling, thresholds, notification tests | SPEC |
| R-03 | IT499 Basic/Access/Business | Subscription entitlements distinct from admin roles | REQUIREMENTS-AUTHORITY.md | None verified | Entitlement and denial tests | SPEC |
| R-04 | IT499 login/email verification | Secure persistent identity, hashed passwords, MFA and recovery | LEGACY-CODE-SECURITY-AUDIT.md; SESSION-SECURITY.md | Legacy insecure code audited only | Authentication and attack tests | SPEC |
| R-05 | Modern workspace expansion | Personal/Business tenant separation and selectable session mode | REQUIREMENTS-AUTHORITY.md; SESSION-SECURITY.md | None verified | Cross-tenant and switch tests | SPEC |
| R-06 | IT499 responsive UI + new mobile decisions | Accessible responsive navigation and device-adaptive layouts | UI-HYBRID-DESIGN.md; CROSS-DEVICE-COMPATIBILITY.md | Standalone preview only, not repository application | iOS/Android, zoom, keyboard, safe-area tests | SPEC |
| R-07 | New security response | Browser capability advisory, OS/browser update guidance | MOBILE-DEVICE-UPDATE-SECURITY.md | src/client/security/device-posture.js; security-settings.js/.css | Execute unit and integration/device tests | CODE |
| R-08 | New business operations | Orders, POS/supplier/spreadsheet/paper imports, staging and reconciliation | DATA-IMPORT-INTEGRATIONS.md | None verified | Duplicate, refund, OCR and tenant tests | SPEC |
| R-09 | Reporting expansion | Authorized charts/tables, freshness labels and nonblocking panels | BUSINESS-COPILOT-LIVE-DATA-VIEWS.md | None verified | Concurrent navigation, permissions, accessibility | SPEC |
| R-10 | New Copilot | Typed Ask/Action/Insight; explicit confirmation for changes | VOICE-COPILOT-UX.md; REQUIREMENTS-AUTHORITY.md | None verified | Intent, confirmation, denial tests | SPEC |
| R-11 | New optional voice | Active-app-only “PIRA” wake word with typed fallback | VOICE-COPILOT-UX.md | None verified | Consent, foreground-only, unsupported device tests | SPEC |
| R-12 | Original restricted administration | Admin/developer privileges isolated from public registration | LEGACY-CODE-SECURITY-AUDIT.md | None verified | Role escalation and audit tests | SPEC |
| R-13 | New operations/security | Supported device matrix, privacy, updates and incident response | CROSS-DEVICE-COMPATIBILITY.md; MOBILE-DEVICE-UPDATE-SECURITY.md | Policy documented; advisory CODE | Incident and device validation | SPEC |
| R-14 | Original reporting/sharing | Authorized reporting, sharing and exports | ROADMAP.md; API-CONTRACT.md | None verified | Access/export tests | SPEC |

## Historical WBS reconciliation limitations
The academic WBS is referenced but not completely transcribed or mapped task-by-task here. Original WBS dates, costs, task owners and milestone completion are not automatically carried into this rebuild. A dedicated line-by-line reconciliation requires the full source WBS and validation of each item.

## Change protocol
Every change must identify requirement IDs, rationale, affected files, security/privacy impact, acceptance tests, and verification status. A committed file is not evidence that a test passed.
