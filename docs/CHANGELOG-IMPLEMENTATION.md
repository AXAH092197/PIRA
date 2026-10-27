# PIRA Rebuild — Implementation Decision Log

## 2026-10-27 — Initial foundation
Status: documentation and repository scaffolding only; no runtime application deployed.

1. Preserve existing main branch and work on development/pira-rebuild.
2. Support personal/business workspace separation and explicit context switching.
3. Provide Settings choice between shared authenticated session and isolated sessions, subject to security review.
4. Require server-enforced role and workspace permissions.
5. Plan idle/absolute session expiry, step-up verification, audit events, and secure token handling.
6. Preserve inventory, reminders, tags/search/sort, reporting, verified email, MFA, and tiered access in the scope.
7. Review dependencies before adoption; prefer necessary, maintained components with a clear purpose.
8. Keep secrets and sensitive user data out of source control.

## Pending before implementation
- Review original PIRA application source and academic artifacts.
- Confirm framework, database, hosting, and license choices.
- Define data model, roles, tier matrix, session timeouts, and test acceptance criteria.
- Threat-model authentication, account recovery, business tenancy, and privileged operations.

Changes to requirements should be appended here with rationale, affected modules, tests, and approval status.
