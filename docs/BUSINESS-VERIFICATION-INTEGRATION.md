# Business Verification Integration Guide
Status: source committed; NOT deployed or production-ready.

## Components
- src/server/business-verification/postgres.sql: PostgreSQL schema; run through a controlled migration.
- src/server/business-verification/postgres-store.js: parameterized SQL and atomic transitions using PostgreSQL server time.
- src/server/business-verification/service.js: lifecycle orchestration.
- src/server/business-verification/http.js: injectable HTTP handler.
- business-verification.html: pending/approved/expired/denied UI; GET /api/business-verification/:id.
- tests/business-verification.test.mjs: unit tests for policy and service, not database integration tests.

## Required before running in production
1. Provision PostgreSQL with TLS, restricted service role, backups and migrations. Install/configure a PostgreSQL driver (e.g. pg); none is currently bundled.
2. Mount the HTTP handler behind an HTTPS web server. Provide server-verified session identity (business account, verified email), CSRF protections for POST, request throttling, secure cookies and audit storage.
3. Implement authorizeStart with server-side account/business checks; never trust applicant-submitted roles or company identifiers.
4. Implement authorizeApproval by validating independent company contact, company representative identity and permitted approval scope. Never treat a caller-provided boolean as proof of verification.
5. Implement short-lived one-time hashed verification codes, delivery to independently verified company contacts, resend limits, revocation and anti-replay. Code issuance metadata is not a complete code service.
6. Enforce tenant permissions on EVERY protected business API, not just registration. Approved verification alone is not a complete authenticated session or MFA.
7. Schedule expireDue or use lazy expiry; DB conditional approval already rejects at the 72-hour boundary. Monitor and audit.
8. Build an authenticated 'restart verification' endpoint with abuse controls, plus recovery and MFA onboarding.
9. Run npm test and PostgreSQL integration/security tests; tests have not been executed by this GitHub-only workflow.

## HTTP interface (mounted under the specified paths)
- POST /api/business-verification : {businessId,requestedRole}; server derives account identity.
- GET /api/business-verification/:id : status visible only to request owner.
- POST /api/business-verification/:id/approve and /deny : organization-authorized approvers only.

## Known limitations
- No live database, mail provider, session middleware or deployment configured.
- No persistent code/challenge issuance or verification implementation yet.
- Portal displays a locally ticking clock based on server-issued expiry, but the API is authoritative.
- Do not expose endpoints before all authentication and authorization dependencies are implemented.
