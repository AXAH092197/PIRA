# PIRA Security Baseline (Draft)

Do not commit secrets, production data, access tokens, or credentials.

- Enforce server-side identity, workspace, role, and resource ownership checks on every protected request.
- Use modern password hashing, TLS, session rotation, expiration, and secure cookie configuration.
- Rate-limit sign-in and recovery; require MFA and step-up authentication for privileged operations.
- Audit sign-in, role changes, workspace switching, exports, and deletions without storing secrets.
- Separate personal and business data by tenant/workspace identifiers with negative authorization tests.
- Review dependencies, licenses, vulnerabilities, and transitive packages before adoption.
- Store deployment secrets in a dedicated secrets manager.

Report vulnerabilities privately; do not publish exploit details in public issues.
