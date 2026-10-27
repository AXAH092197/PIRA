# PIRA mobile Settings → Security integration

Status: UI module committed; not wired to the PIRA application shell or production backend.

- Import `mountSecuritySettings` from `src/client/security/security-settings.js`.
- Load `src/client/security/security-settings.css`.
- On the Security page, call `const cleanup = mountSecuritySettings(settingsContainer, window)`.
- Call `cleanup()` when leaving the page. The "Check again" button refreshes local capability checks.
- UI uses textContent and DOM creation, not HTML injection. It does not access the microphone, fingerprint the device, collect identifiers, or call an API.
- Uses fluid layout and a minimum 44px button target. The outer app shell must supply safe-area padding and responsive navigation.
- Security advisory is informational only. Do not use it as a substitute for server-enforced authentication, session revocation, or vendor update attestation.
- Before release: integrate with actual Settings navigation; test VoiceOver, TalkBack, narrow widths, browser zoom and different devices; connect authenticated session management separately.
