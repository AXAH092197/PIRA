# PIRA Hybrid UI Direction
Status: Approved by product owner, 2026-10-27.

## Preserve and modernize
Keep familiar dashboard, inventory listing, item cards, search, filters, and existing gray/blue/white identity. Improve accessibility, consistency, responsive behavior, and feedback without needless redesign.

## Substantially redesign
### Business workspace
Dedicated business navigation and role-aware workflows, inventory views appropriate to organizations, and clear workspace identity. Enforce tenant and permission boundaries in the backend, not only UI.
### Copilot
Dedicated Ask, Action, and Insight experiences. Show sources/context where available, preview proposed changes, require explicit confirmation for mutating actions, and report execution outcomes accurately.
### Settings
Organized account/security, workspace, session, permissions, notification, and subscription sections. Offer personal/business switching preference (same-session vs separate-session), but enforce authorization and expiry server-side.

## UX constraints
- Responsive mobile/desktop; labeled controls, keyboard navigation, descriptive errors, tooltips and accessible contrast.
- Preserve original workflows until replaced by tested equivalents.
- Distinguish plan entitlement from administrative privileges.
- No implementation claims: this document records direction, not completed UI code.

## Acceptance criteria
1. Familiar personal dashboard and inventory flows remain recognizable.
2. Business, Copilot and Settings use intentionally redesigned navigation and task flows.
3. Workspace switching cannot expose data across contexts.
4. Sensitive actions require authorization and appropriate confirmation.
5. Screen reader, keyboard and mobile checks included in UI testing.
