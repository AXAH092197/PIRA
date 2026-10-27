# Device security advisory module

This module is a first implementation of PIRA's privacy-preserving device security messaging. It can be imported by the future Settings > Security screen.

It deliberately **does not** claim to detect iOS/Android security patch levels or enforce server access policies. Browser APIs cannot reliably provide this information. Server-side authorization, step-up authentication, session revocation, minimum support policy, and update notifications remain separate implementation tasks.

Example:
```js
import {readBrowserCapabilities,evaluateDevicePosture} from "./device-posture.js";
const advisory=evaluateDevicePosture(readBrowserCapabilities(window));
// Render notices with textContent, not innerHTML.
```

Run tests from repository root with `node --test tests/device-posture.test.mjs` in an ESM-capable Node runtime. This module is standalone and adds no dependencies.
