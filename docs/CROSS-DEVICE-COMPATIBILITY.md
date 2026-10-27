# PIRA cross-device compatibility
Status: Product-owner-approved requirement, 2026-10-27. Specification only; not implemented or verified.

## Principle
Deliver equivalent core inventory, business, settings and typed Copilot capabilities across supported phone brands, operating systems and hardware tiers. Adapt layout and optional features to device capabilities instead of requiring specific screen dimensions or manufacturer.

## UI and accessibility
- Mobile-first responsive layouts using flexible widths, relative sizing, and responsive breakpoints; no hardcoded phone models.
- Respect safe-area insets, display cutouts, home indicators, orientation, foldable hinges, browser zoom, and dynamic text sizing where exposed.
- Keep navigation and primary actions reachable; prevent horizontal scrolling and modal traps.
- Accessible semantic controls, screen readers, high contrast, reduced motion, keyboard/switch access, and appropriate touch target sizes.
- Preserve usable typed Copilot when speech APIs, microphones, or permissions are unavailable.

## Performance and resilience
- Progressive enhancement and capability detection rather than brand detection.
- Optimize bundles, image assets, table virtualization, pagination, lazy loading and network requests for low-memory/low-power devices.
- Support variable connectivity, request retries, visible sync state and safe offline behavior where feasible.
- Do not require high-end GPUs or AI acceleration for basic inventory workflows.

## Voice
- Hands-free “PIRA” wake word remains an optional, permission-based feature active only while the application is open and foregrounded.
- Reliable continuous recognition may require platform-specific native components; do not promise identical behavior across all browsers.
- On unsupported devices, provide explicit status and accessible tap-to-talk or typing fallback.

## Test matrix and acceptance
- Define and publish minimum supported OS/browser versions before release.
- Test representative older/newer iOS and Android devices, low-memory phones, small/large screens, tablets, foldables, dark mode, zoom, VoiceOver/TalkBack, slow networks, offline state and denied permissions.
- Verify functional parity for core flows and document exceptions for platform-limited features.
- No claim of universal compatibility or completed testing until device validation is performed.
