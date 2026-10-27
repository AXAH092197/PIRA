# PIRA Rebuild Roadmap — reconciled 2026-10-27
Status legend: [x] repository artifact verified; [ ] not completed. Documentation completion does not imply runtime implementation.

## Phase 0 — Discovery and traceability
- [x] Audit available historical source security concerns (LEGACY-CODE-SECURITY-AUDIT.md).
- [x] Establish requirements authority and consolidated master specification.
- [x] Create requirement-to-validation matrix (REQUIREMENTS-TRACEABILITY.md).
- [ ] Complete line-by-line academic WBS reconciliation.
- [ ] Finalize supported .NET runtime, database, hosting, email and dependency selections.

## Phase 1 — Runnable application shell (next)
- [ ] Build and launch mobile-first responsive shell with Home, Inventory, Business, Copilot and Settings navigation.
- [ ] Implement responsive safe-area-aware navigation and accessibility behavior.
- [ ] Mount committed Security settings UI and device posture advisory.
- [ ] Implement sample-data inventory interactions with clearly marked demo state.
- [ ] Execute automated frontend tests and representative device checks.

## Phase 2 — Secure foundation
- [ ] Implement persistent accounts, password hashing, verified email, MFA and recovery.
- [ ] Implement server-enforced roles, workspace/tenant isolation and session expiry/revocation.
- [ ] Test authentication, denial, cross-workspace isolation, and sensitive-operation step-up.
- [ ] Integrate update notices and incident response controls with backend policy.

## Phase 3 — Core inventory
- [ ] Implement persistent inventory CRUD, locations, tags, search and movement history.
- [ ] Implement reminders, low-stock alerts and reorder workflows.
- [ ] Test ownership, transactions, audit and backups.

## Phase 4 — Business and Copilot
- [ ] Implement orders, supplier records, staged imports, reconciliation and reporting.
- [ ] Implement typed Copilot, authorized chart/table panels and confirmation-gated actions.
- [ ] Evaluate optional foreground-only voice support and provider integration.
- [ ] Define and implement plan entitlements and optional billing.

## Phase 5 — Release assurance
- [ ] Validate supported iOS/Android/browser matrix and accessibility.
- [ ] Security, privacy, dependency, performance, backup/restore and incident drills.
- [ ] Staging deployment, monitoring, rollback and release sign-off.

## Currently committed isolated implementation
- [x] Browser device-posture advisory module.
- [x] Security Settings UI component and responsive stylesheet.
- [x] Device-posture unit test source.
- [ ] Verified execution of those tests.
- [ ] Integration into a runnable PIRA application.

See MASTER-DEVELOPMENT-SPECIFICATION.md, REQUIREMENTS-TRACEABILITY.md and CHANGELOG-IMPLEMENTATION.md.
