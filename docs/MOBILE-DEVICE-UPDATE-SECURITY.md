# Mobile device update and security policy
Status: Approved design requirement; implementation and device validation pending.
Scope: PIRA mobile web, progressive web app, and any future native wrappers.

## Objectives
- Protect personal inventory, business data, account credentials, sessions and device-specific application settings across supported iOS and Android devices.
- Use supported OS and browser security updates as one risk signal, not proof of device safety.
- Avoid collecting unnecessary device identifiers or detailed hardware fingerprints.

## Platform support and update policy
1. Publish a maintained support matrix for minimum iOS/Android and browser versions, based on vendor security support and real-device testing. Reevaluate at each release and after critical platform advisories.
2. Recommend security patches and browser/app updates when relevant. Explain the benefit and offer a clear update path.
3. Where reliable update/patch-level information is unavailable (especially in browsers), mark the signal as unknown rather than assuming an outdated or secure device.
4. A known critical unpatched vulnerability affecting PIRA's threat model can trigger a targeted restriction of high-risk operations after documented review. Never block basic access solely on an unreliable user-agent version.
5. Provide grace periods and advance notices for planned end-of-support where feasible; do not override urgent incident response.
6. Separate core inventory compatibility from optional hardware-dependent features. Typed Copilot and account recovery remain accessible on supported devices even if speech or hardware acceleration is absent.

## Security response controls
- Enforce server-side authorization, tenant separation, MFA for sensitive operations, and risk-aware reauthentication.
- Use short-lived sessions and rotating/revocable refresh credentials; revoke compromised sessions. Store tokens using appropriate secure browser cookies or OS-backed key storage, depending on client.
- Encrypt transport with TLS and sensitive server data at rest. Minimize on-device caches; encrypt sensitive offline data where platform storage permits.
- Avoid storing raw credentials in localStorage or shipping secrets inside client code.
- Apply rate limiting, anomaly detection, audit trails, secure backups and tested recovery.
- Deliver signed application updates through trusted distribution channels for native apps; enforce HTTPS and integrity protections for web assets.
- Treat rooted/jailbroken or compromised-device signals as probabilistic, privacy-sensitive indicators; do not claim universal detection or automatically lock out users without a defined risk policy.
- Support remote session revocation and user-visible device/session management, but never claim the app can force-install OS updates.

## Device data and privacy
- Collect only the minimum compatibility/security telemetry necessary, with transparent disclosure and retention limits.
- Do not harvest serial numbers, IMEI, advertising IDs, contact lists or precise device hardware profiles for routine compatibility.
- Expose which device settings are locally applied (theme, reduced motion, text size) without transmitting them unless needed for a user-enabled sync feature.
- Provide accessible messaging about unsupported versions and available alternatives.

## Incident response
- Monitor trusted platform/vendor advisories and app dependency vulnerabilities.
- Classify affected versions and operations, patch and test, deploy fixes, and communicate proportionate mitigations.
- For active compromise, invalidate sessions, rotate affected secrets, investigate audit logs and notify impacted users as required.
- Maintain rollback and recovery procedures for faulty releases.

## Validation
- Test representative small/large, older/newer, low-memory, foldable, iOS and Android devices.
- Verify updated, outdated, unsupported and unknown patch-state messaging; safe behavior on offline/limited networks.
- Verify authentication, session expiry/revocation, secure local storage, accessibility and no regression in core inventory flows.
- Review minimum OS/browser support periodically and document exceptions.
