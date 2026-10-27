import {evaluateDevicePosture,readBrowserCapabilities} from "./device-posture.js";

/** Mount a mobile-friendly Security settings section into an existing container.
 * Uses DOM text nodes (not innerHTML) and never transmits device details.
 * Returns cleanup function for event listeners.
 */
export function mountSecuritySettings(container, env = globalThis) {
  if (!container || typeof container.replaceChildren !== "function") throw new TypeError("A DOM container is required");
  const doc = container.ownerDocument;
  const section = doc.createElement("section");
  section.setAttribute("aria-label", "Device and application security");
  section.className = "pira-security-settings";
  const heading = doc.createElement("h2");
  heading.textContent = "Device & application security";
  const description = doc.createElement("p");
  description.textContent = "PIRA checks browser capabilities, not your phone's private hardware identifiers.";
  const status = doc.createElement("p");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const list = doc.createElement("ul");
  const refresh = doc.createElement("button");
  refresh.type = "button";
  refresh.textContent = "Check again";
  const advisory = doc.createElement("p");
  advisory.textContent = "For security patches, check your phone's system settings and update your browser through its official store.";
  function render() {
    const result = evaluateDevicePosture(readBrowserCapabilities(env));
    status.textContent = result.status === "review" ? "Security attention recommended" : "Security patch status not verifiable in browser";
    list.replaceChildren();
    for (const notice of result.notices) {
      const li = doc.createElement("li");
      li.textContent = notice.message;
      li.dataset.severity = notice.severity;
      list.appendChild(li);
    }
    return result;
  }
  refresh.addEventListener("click",render);
  section.append(heading,description,status,list,refresh,advisory);
  container.replaceChildren(section);
  render();
  return () => { refresh.removeEventListener("click",render); if (section.parentNode === container) container.replaceChildren(); };
}
