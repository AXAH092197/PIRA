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
