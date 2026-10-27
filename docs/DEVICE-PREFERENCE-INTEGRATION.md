# Device preference integration — approved direction

PIRA should automatically follow supported device/browser settings instead of forcing duplicate configuration.

## Supported web behaviors
- Follow prefers-color-scheme, prefers-reduced-motion, and prefers-contrast where supported.
- Use semantic HTML, native focus behavior, viewport-safe responsive layout, and dynamic text sizing with relative units.
- Respect platform screen readers, keyboard controls, zoom, and accessibility APIs through accessible markup.
- Allow explicit in-app overrides when the user chooses them.

## Speech
- Prefer platform-provided speech recognition when exposed through a supported browser API; request microphone permission on explicit user action.
- Parse “PIRA” (pronounced Peer-Ra) followed by conditional questions (what/what's/can you/is there/when/how/where).
- Provide transcript preview, text fallback, visible listening state, and confirmations for mutating actions.
- Browser APIs do not guarantee background or always-on wake-word support. Evaluate native mobile or OS shortcuts separately.
- Never infer permission to capture audio or alter phone settings.

## Acceptance
Verify with iOS Safari and Android browsers, including dynamic type/zoom, VoiceOver/TalkBack, dark mode, reduced motion, microphone denial, and unsupported recognition APIs.

This is a requirement specification, not evidence of implementation.

## Accessibility activation and app lifecycle — owner clarification
- PIRA accessibility assistance and optional voice listening are enabled through PIRA Settings, not automatically activated merely because the device supports them.
- Optional PIRA accessibility enhancements operate only while the PIRA application is open and active. Stop speech listening when the app closes, is backgrounded, or becomes inactive; do not attempt background monitoring.
- When accessibility is enabled, use the device's supported preferences as defaults. Allow users to disable optional enhancements independently.
- Essential accessibility standards (semantic labels, keyboard access, readable contrast, screen-reader compatibility) remain present for everyone, even if optional accessibility assistance is off.
- Browser/platform permission requirements still apply; an in-app toggle does not grant microphone permission.
- On reopening the app, restore the saved setting but do not silently begin microphone capture without an appropriate user-initiated permission/activation flow.

## Hands-free wake word — owner-approved requirement
- While PIRA is open, active, and the user has enabled voice accessibility in Settings, provide hands-free wake-word recognition for “PIRA” (pronounced “Peer-Ra”) without requiring a microphone button press for each command.
- After wake-word detection, accept natural follow-on conditional requests including “what/what's”, “can you”, “is there”, “when”, “how”, and “where”.
- Show visible listening and processing indicators, offer a mute/pause control and transcript review, and confirm state-changing actions.
- Stop listening when the app is backgrounded, closed, or the feature is disabled; do not listen outside the active app.
- Hands-free detection requires user microphone consent and a suitable on-device or native speech implementation. Browser limitations mean a pure web prototype may not guarantee continuous wake-word operation, particularly on iOS. Do not claim production support until tested on supported devices.
- Prefer on-device wake-word detection and avoid storing raw audio by default.
