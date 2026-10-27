# Legacy PIRA Code Audit — 2026-10-27

Source: uploaded IT499 Unit 9 ZIP. Historical evidence, not authoritative requirements.

## Verified source findings
- API targets net8.0; Program.cs uses ASP.NET minimal APIs.
- Users and email tokens are held in ConcurrentDictionary, not persistent storage.
- UserRecord includes a plaintext Password field; login compares strings directly.
- CORS default policy allows any origin, header, and method.
- Token generation uses RandomNumberGenerator.GetInt32; expiry is ten minutes, but persistence, replay safeguards and attempt limits need design review.
- API binds localhost:5170 and has email test and developer registration endpoints requiring production review.
- SQL schema is a separate draft; not wired to the in-memory API.
- SQL schema seeds administrator email identities; remove fixed administrator seeds from any new production migration.
- HTML legacy interface should be inspected for client-side authorization and unsafe DOM/storage patterns before reuse.
- The old Brevo key was reported inactive by the product owner. Do not import or publish credentials.

## Required remediation
1. Use persistent account, session, and workspace storage with schema migrations.
2. Hash passwords using a vetted password hasher; never retain plaintext.
3. Enforce server-side roles, resource ownership, and workspace boundaries.
4. Restrict CORS to configured trusted origins, with explicit credential policy.
5. Rate-limit login, verification, recovery, and developer registration; protect against account enumeration.
6. Hash one-time codes at rest, enforce expiry, attempt limits, and one-time consumption.
7. Separate admin and developer approval from public self-registration.
8. Store secrets outside Git and audit logs; require private deployment configuration.
9. Test unauthorized access, cross-tenant access, session revocation, and recovery.

## Scope
Audit only; no claim of completed remediation or functional tests.
