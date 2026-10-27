# PIRA Rebuild — Implementation Decision Log
Branch: development/pira-rebuild. Production main is intentionally untouched by these changes.

## 2026-10-27 — Initial foundation
- Approved personal/business workspace separation, optional session mode, server-side authorization, secure credential and MFA requirements, inventory/reminders/reporting and Basic/Access/Business tiers.
- Requirements authority and architecture/contract/security plans committed.
- Historical legacy source reviewed; plaintext password storage, ephemeral accounts, permissive CORS and disconnected SQL schema flagged. Legacy secret reported revoked; never reuse.

## 2026-10-27 — UI and expanded requirements
- Approved hybrid UI: preserve familiar personal inventory; redesign Business, Copilot, Settings; more spacious mobile-first navigation.
- Approved text-accessible Copilot, optional foreground-only “PIRA” voice, and device accessibility preferences.
- Approved staged business data imports, reconciliation and nonblocking report panels.
- Recorded McMaster-Carr category/search design reference without copying proprietary assets or assuming its hosting.

## 2026-10-27 — Cross-device and security policy
- Cross-device policy committed (CROSS-DEVICE-COMPATIBILITY.md; commit 4cfdd7a).
- Device update and security policy committed (MOBILE-DEVICE-UPDATE-SECURITY.md; commit a92b6a4).
- Browser device-posture advisory committed (src/client/security/device-posture.js; commit f2737d1).
- Unit test source committed (tests/device-posture.test.mjs; commit d972ca4); execution NOT verified.
- Security Settings component committed (src/client/security/security-settings.js/.css; commits 63ded7b, 04dc697), integration guidance committed (7e60712).
- Security advisory checks secure context, crypto capability, cookies and online status. Browser cannot reliably determine OS patch level; unknown is not secure attestation.
- Privacy: no fingerprinting or collection of hardware IDs; no automatic OS updates.

## 2026-10-27 — Documentation reconciliation
- MASTER-DEVELOPMENT-SPECIFICATION.md added as central planning baseline.
- REQUIREMENTS-TRACEABILITY.md added with IDs, original/current mappings, evidence and validation needs.
- ROADMAP.md updated to separate verified documentation/code commits from unverified runtime/test status.
- This log reconciled to reflect recent decisions. Original academic WBS is NOT yet mapped line by line.

## Required change-record fields for future work
Requirement IDs, rationale, affected modules, security/privacy implications, tests planned/executed, and approval/verification status.

## Immediate next milestone
Build a runnable mobile-first application shell, integrate Security Settings, then execute tests. Persistent identity, authorization, database and live integrations remain pending. No production deployment is claimed.
