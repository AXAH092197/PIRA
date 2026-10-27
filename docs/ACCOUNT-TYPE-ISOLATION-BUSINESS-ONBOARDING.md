# PIRA Account-Type Isolation and Business Onboarding
Status: product-owner decision approved; design specification, not implemented backend authentication.

## Superseded behavior
Remove the prior Personal/Business workspace toggle within one authenticated account. Personal and Business are separate account environments, bound to verified account email and immutable account-type identity. Do not share application sessions, tenant data, permissions, Copilot history, or inventory between them. A user seeking the other type must register separately with an eligible distinct email under the current policy; migration/conversion is not automatic.

## Registration
1. Register and verify account email ownership.
2. Choose Personal or Business profile type.
3. Personal: complete profile, credentials and required MFA, then authorized Personal Home.
4. Business: open organization portal with Business dropdown/search. Search results must be authorized and privacy-preserving; no arbitrary private-company enumeration.
5. If not found, Other reveals custom business profile entry and verification initiation.
6. Select private or public business profile visibility. Public controls discoverable company metadata only; never exposes internal records or grants permissions.
7. Request affiliation (owner/admin/employee/authorized representative), prove ownership or authorization via verified business-domain email, invitation/approval, or appropriate manual review. Email domain alone is not conclusive ownership.
8. Pending/rejected verification grants no protected company access. Existing organization membership requires admin approval according to policy. Prevent duplicate and impersonated organizations.
9. After successful organization connection and permission approval, complete or activate account credentials, MFA enrollment, and authenticated Business Operations access. The verified email and account identity must remain bound to this connection.

## Server-side invariants
Unique email/account-type policy must be defined and enforced in identity storage; normalize email safely, do not assume plus-address variants establish separate people. Explicit tenant identifiers, row-level authorization, least-privilege roles, audit trail, rate limits, verification expiry, revocation and appeal. Never authorize business operations based solely on client-selected business name or public visibility. Separate login sessions and protected routes by account type. Credentials and recovery methods are managed securely; no plaintext passwords or client-side MFA bypass.

## UI requirements
Profile type choice after verified registration; business dropdown with Other option; conditional company-name form; private/public visibility selector; relationship/role selection; verification pending/approved/rejected screens; credentials and MFA setup; distinct personal/business home routes. Accessible field labels, keyboard navigation, screen-reader status and mobile responsive design.

## Release gates
Design-only preview is not a verified connection. Integration tests: account-type isolation, email uniqueness, duplicate company, private discovery, unauthorized admin role, pending access denial, verification replay, session cross-type access, and audit.

## Confirmed product-owner decision: mandatory email separation (2026-10-27)
A person using both Personal and Business must register TWO different verified email addresses. A single email must not be associated with both account types, including through alternate login methods. This is a required security control, not a user preference or optional setting.

- Enforce unique canonical verified email per account and permanently bind each account to its selected Personal or Business type. Reject cross-type registration with the same email without disclosing unnecessary account details to unauthenticated requesters.
- Independent passwords/passkeys, MFA enrollment and recovery, sessions, permissions, tenant-scoped data, and Copilot context. No in-app cross-type toggle, account linking, shared tokens or implicit cross-environment access.
- Users who operate both types sign out and sign in with the other email/account. A business account's company membership remains subject to verified affiliation and approval.
- Email change requires proof of control of the replacement address, recent reauthentication or step-up MFA, uniqueness checks, session rotation/revocation and an auditable notification to the prior address where appropriate.
- Apply email normalization carefully (case handling and provider-specific alias conventions); do not assume plus-address aliases guarantee independent security identities. Document policy for aliases and identity providers before launch.
- Test same-email cross-type rejection, alias edge cases, social-login collisions, independent MFA/recovery, session isolation, and account email changes.
