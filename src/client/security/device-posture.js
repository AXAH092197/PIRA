/**
 * PIRA device compatibility and update advisory.
 * Privacy-preserving: no device fingerprint, telemetry, or network calls.
 * Browser APIs cannot reliably reveal OS patch level.
 */
export const POSTURE = Object.freeze({
  SUPPORTED: "supported",
  REVIEW: "review",
  UNKNOWN: "unknown"
});

/**
 * @param {{isSecureContext?: boolean, cookieEnabled?: boolean, online?: boolean, hasCrypto?: boolean}} capabilities
 * @returns {{status: string, notices: Array<{code:string,severity:string,message:string}>}}
 */
export function evaluateDevicePosture(capabilities = {}) {
  const notices = [];
  if (capabilities.isSecureContext === false) {
    notices.push({code:"insecure-context",severity:"critical",message:"Use a secure HTTPS connection before signing in or accessing personal data."});
  }
  if (capabilities.hasCrypto === false) {
    notices.push({code:"crypto-unavailable",severity:"warning",message:"Secure device cryptography is unavailable. Sensitive offline features must remain disabled."});
  }
  if (capabilities.cookieEnabled === false) {
    notices.push({code:"cookies-disabled",severity:"warning",message:"Secure sign-in may require browser cookies."});
  }
  if (capabilities.online === false) {
    notices.push({code:"offline",severity:"info",message:"You are offline. Data synchronization is paused."});
  }
  notices.push({code:"patch-unknown",severity:"info",message:"PIRA cannot verify your phone's security patch level from the browser. Keep your operating system and browser updated."});
  return {status:capabilities.isSecureContext === false ? POSTURE.REVIEW : POSTURE.UNKNOWN,notices};
}

/** Explicitly called in a browser; never infer patch level from the user-agent. */
export function readBrowserCapabilities(env = globalThis) {
  return {
    isSecureContext: typeof env.isSecureContext === "boolean" ? env.isSecureContext : undefined,
    cookieEnabled: typeof env.navigator?.cookieEnabled === "boolean" ? env.navigator.cookieEnabled : undefined,
    online: typeof env.navigator?.onLine === "boolean" ? env.navigator.onLine : undefined,
    hasCrypto: Boolean(env.crypto?.subtle)
  };
}

/** Escaping and DOM insertion remain the responsibility of the consuming UI. */
export function securityNoticeText(result) {
  return result.notices.map(n => n.message).join(" ");
}
