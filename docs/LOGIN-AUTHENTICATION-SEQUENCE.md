# PIRA login, MFA, authentication and home routing
Status: login.html is a non-authenticating UI sequence preview; NO production login or 2FA implemented.
Requested example URL: https://www.pira.login.com/ — ownership, DNS, availability and TLS NOT verified. Do not treat as configured or use as a callback/redirect origin. Prefer a domain actually controlled by the project owner, such as a verified subdomain of an owned PIRA domain.

## Screens and transitions
1. Public landing/sign-in: email + password; accessible errors and neutral responses to avoid account enumeration.
2. New account: registration, email ownership verification via single-use expiring token, password enrollment, first-factor login, mandatory MFA enrollment for protected roles (policy for regular users pending).
3. Existing account: server verifies password hash, rate limits and creates short-lived pending challenge state, not an authenticated session.
4. MFA challenge: authenticator TOTP or phishing-resistant passkey where supported; single-use recovery codes for backup; verify server-side with expiry, attempt limits and replay protection.
5. Session issuance: only after required factors verified; secure HttpOnly SameSite cookies with CSRF protection, idle/absolute expiration, rotation and revocation; enforce server authorization.
6. Home routing: fetch authorized personal/business workspace membership; default to last permitted workspace or selection; never trust client-side workspace switch for access control.
7. Recovery: separate identity verification, rate limiting, revocation and audit; prevent MFA bypass and avoid email-only weak recovery.
8. Logout: revoke server session, clear cookie and sensitive cached state.

## Security and UX
Never put real secrets in a static preview. No hardcoded login, demo bypass, client-only verification or plaintext passwords. Do not automatically authenticate users just because a six-digit value is entered. Preserve keyboard, screen-reader and small-screen accessibility. Distinguish initial enrollment from routine sign-in. Include trusted-device management only after explicit policy and risk review.

## Implementation backlog
- Auth API and persistent identity/session storage.
- Registration, email delivery and verified ownership.
- Password hasher and credential policies.
- TOTP/passkeys, enrollment, recovery codes, step-up and lockout/rate limits.
- CSRF protection, cookie/session rotation, audit and workspace authorization.
- Automated unit, integration and abuse-case tests.
- Configure verified domain, DNS, TLS and allowed redirects.
- Replace preview navigation with real authenticated routing only after backend gates pass.

## Acceptance tests
Invalid email/password, enumeration resistance, MFA replay and expiration, brute force, recovery, CSRF, session fixation, logout/revocation, workspace isolation, privilege escalation, and accessibility.
