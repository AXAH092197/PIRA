# PIRA accessibility and voice Copilot direction
Approved by product owner, 2026-10-27.

## Layout
The previous demo feels too condensed. Increase whitespace, readable typography, minimum touch target sizes, section separation, meaningful headings, accessible contrast, keyboard focus, and responsive stacking. Prioritize progressive disclosure rather than simultaneous dense panels. Preserve the familiar personal inventory workflow; redesign Business, Copilot and Settings.

## Voice activation
Pronunciation: PIRA = “Peer-Ra”.
Invocation grammar: wake word PIRA followed by a conditional request, such as “what's…”, “what…”, “can you…”, “is there…”, “when…”, “how…”, or “where…”.
Examples: “PIRA, what's low on stock?”; “PIRA, can you show my inventory?”; “PIRA, is there anything to reorder?”; “PIRA, when should I reorder batteries?”; “PIRA, how many items do I have?”; “PIRA, where are the office supplies?”

## Design safeguards
- Offer accessible microphone start/stop, listening indicator, transcript confirmation, and text fallback.
- Never claim always-on wake-word listening if the browser/app is not actually monitoring.
- Speech recognition requires explicit permission and compatible platform; production support needs an evaluated speech provider or on-device engine.
- Handle false activations, noisy input, privacy, unsupported questions and offline state gracefully.
- Never execute inventory mutations on voice alone without explicit confirmation and server-side authorization.
- Do not store raw audio by default. Provide clear controls and retention disclosure.
- Respect workspace scope and permission boundaries.

## Prototype scope
Tap-to-listen browser speech recognition may demonstrate the grammar where supported. It is not continuous background wake-word detection or production-grade voice authentication.

## Deaf and hard-of-hearing accessibility — approved
- Copilot text input is permanently available regardless of voice accessibility settings, microphone access, audio output or device capability.
- Typed and spoken requests route to the same intent, authorization and business data visualization workflows.
- All answers, errors, confirmations, and status changes have visible text equivalents. No audio-only instructions or feedback.
- Show optional speech transcripts and let users correct recognition errors before submission.
- Offer text-only and combined text/voice modes; never force speech output.
- Support device dictation, keyboard, screen readers, text resizing, captions for any instructional media, and clear visual listening indicators.
- Keep non-modal chart/table panels accessible through keyboard and screen readers, including textual data alternatives.
- Test with audio disabled, microphone denied, hearing accessibility settings enabled, and mobile screen reader navigation.
