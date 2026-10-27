# PIRA Operations Home Transition
Approved behavior: after the authentication server verifies both credentials and required MFA, establishes a valid session, and checks authorized workspace membership, render the PIRA Operations Home with a 400 ms opacity/translate fade-in. Honor prefers-reduced-motion by skipping animation. Failed or pending authentication must never render protected operations content.

Requested proposed URL: https://www.pira-home.com/ — domain ownership, DNS, HTTPS, cross-domain cookie/session handoff and deployment are not verified. This URL is NOT configured as a live redirect. Prefer a same-site app route or a verified owned domain; use server-authorized one-time handoff if a separate domain is eventually approved, never tokens in query strings.

Current login.html is a local UI preview. Its six-digit entry is not real MFA and its transition is only a visual demo. The animation does not establish authentication or grant authorization.

Acceptance: successful server-verified MFA -> valid session -> home; failed MFA -> remain challenge; unauthorized workspace -> deny; reduced-motion -> no animation; refresh/direct-link to home -> server checks session; logout -> revokes session.
