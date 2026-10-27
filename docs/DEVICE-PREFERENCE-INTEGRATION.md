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
