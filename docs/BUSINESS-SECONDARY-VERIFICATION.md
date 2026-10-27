# PIRA Business Secondary Verification
Status: approved product workflow, not implemented.

## Sequence
1. Applicant verifies distinct Business account email ownership.
2. Applicant chooses existing business or Other; provides organization name and requested role.
3. PIRA independently establishes official organization contact details from trustworthy sources. Do not rely solely on applicant-provided phone or email.
4. Applicant contacts the organization's official customer-service/administrative hotline by telephone to request verification routing.
5. An authorized company representative confirms the applicant's affiliation and requested role via an independently verified organizational email channel or secure approval portal. Customer-service routing alone is not authorization.
6. PIRA generates a short-lived, one-time secondary verification challenge bound to the applicant, organization, role, and request. Deliver only to an independently verified authorized organization contact; never use a user-supplied unverified address.
7. Authorized representative completes challenge and approval. PIRA records evidence, timestamps, reviewer and permission scope. Failed, expired, rejected or pending cases grant no protected access.
8. Applicant completes credentials and MFA enrollment and receives Business Operations access only after server-side approval and session checks.

## Security and privacy
Rate-limit verification attempts and resends; expire and invalidate codes after use; prevent replay, impersonation and social-engineering approval. Never disclose private business contact details through public discovery. Use alternative formal verification when customer service cannot authorize employees or when organization lacks a hotline. Public business profiles do not expose internal operations or bypass approval. Company owner/admin permissions require stronger evidence than mere email-code possession.

## Open design decision
Clarify whether PIRA sends the challenge to a designated company verifier, or whether an organization-initiated code is entered by the applicant. Default security design is PIRA-issued challenge to an independently verified authorized representative with a server-side approval record.
