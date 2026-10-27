# PIRA Master Development Specification
Version 0.2 | 2026-10-27 | Status: consolidated planning baseline, NOT production-ready

## Authority and provenance
The latest approved product-owner decisions govern; prior agreed decisions apply unless superseded. Original IT499 capstone files, WBS, and prototype code are historical evidence, not validated production specifications. See REQUIREMENTS-AUTHORITY.md. This consolidation is derived from repository documentation, not a line-by-line verification of every original uploaded file. No full WBS reconciliation is claimed.

## Product definition
PIRA (Personal Inventory & Reminder Application) supports personal inventory and permission-scoped business inventory operations, accessible from responsive desktop and mobile interfaces.

## Required functional modules
1. Identity and sessions: verified email, strong password hashing, MFA, recovery, session expiry/revocation, step-up verification, audit.
2. Workspaces: personal and business, tenant-scoped roles, Settings choice of shared vs separate session model subject to security design.
3. Inventory: item records, profiles, category, tags, location, quantities, movement history, search/sort/filter, minimum stock, reminders and reorder support.
4. Business: orders, supplier records, imports, reconciled movements, scoped team permissions, reporting.
5. Copilot: permanently available text entry; Ask/Action/Insight; confirmation and server authorization for mutations; optional active-app-only voice; nonblocking chart/table panels.
6. Accessibility and mobile: adaptive widths and safe areas, reduced motion, readable scaling, screen readers, keyboard/touch, small/large phones and foldables; optional voice must never gate typed functionality.
7. Security and updates: privacy-preserving device capability advisories, vendor update guidance, secure sessions and data handling; do not pretend browser APIs can verify OS patch levels.
8. Plans and operations: Basic/Access/Business entitlements separate from administrative roles; billing, hosting, backup, monitoring and deployment require decisions.

## Architecture
Prefer a modular monolith, with responsive web client, .NET API, persistent relational storage, reminder worker, secure storage for files, and optional integrations. Legacy net8.0 code is a reference only; confirm supported runtime and provider before production. No unnecessary dependencies or secret material in Git.

## Current repository evidence
- Legacy source security audit: LEGACY-CODE-SECURITY-AUDIT.md (plaintext passwords, in-memory accounts, permissive CORS, separate SQL draft).
- Requirements: UI-HYBRID-DESIGN.md, VOICE-COPILOT-UX.md, DEVICE-PREFERENCE-INTEGRATION.md, DATA-IMPORT-INTEGRATIONS.md, BUSINESS-COPILOT-LIVE-DATA-VIEWS.md.
- Security: MOBILE-DEVICE-UPDATE-SECURITY.md, CROSS-DEVICE-COMPATIBILITY.md, SECURITY-SETTINGS-INTEGRATION.md.
- Implemented isolated modules: src/client/security/device-posture.js and security-settings.js/.css, with tests/device-posture.test.mjs. These are NOT integrated into a runnable application shell; tests are committed but execution is not independently verified.

## Priority sequence
A. Build runnable responsive application shell with functional navigation and Settings integration.
B. Design and implement secure identity, persistence, authorization and workspace boundaries.
C. Implement persistent inventory, movements, reminders and search.
D. Add business orders, imports, reconciliation and reports.
E. Connect Copilot to authorized data and implement optional voice after platform validation.
F. Verify accessibility, cross-device compatibility, security, deployment and recovery.

## Release gates
No release without verified credential hashing, MFA, server authorization, tenant isolation, secure session lifecycle, data backup/restore, dependency scanning, accessibility checks, representative iOS/Android testing, and operational incident response. No unverified claim of universal device compatibility.

## Open decisions
Database/provider, runtime lifecycle, hosting, email delivery, MFA/recovery implementation, roles/entitlements, pricing, data retention, sync/offline scope, voice technology, minimum OS/browser versions, and migration of legacy records.

## Navigation
Use REQUIREMENTS-TRACEABILITY.md for requirement-to-test mapping, ROADMAP.md for phase status, and CHANGELOG-IMPLEMENTATION.md for dated changes.
