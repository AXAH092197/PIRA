# PIRA Acceptance Criteria — Initial

## Authentication and authorization
- Anonymous requests cannot access protected data.
- Workspace membership and role are verified server-side for every operation.
- Cross-workspace item IDs return no data.
- Revoked memberships and sessions lose access promptly.
- MFA recovery and privileged operations require additional verification.

## Inventory
- Authorized users can create, edit, list, filter, tag, and soft-delete items.
- Invalid quantities and malformed input are rejected.
- Concurrent updates cannot silently overwrite changes.

## Reminders
- Timezone and daylight-saving changes are handled predictably.
- Duplicate delivery attempts are idempotent.
- Workspace removal stops access to reminders.

## UI
- Personal and business contexts are clearly labeled.
- Session mode is selectable in Settings with security constraints.
- Context switching does not expose cached data from another workspace.
- Forms have accessible labels, errors, and keyboard operation.

No acceptance tests are currently executable; implementation is pending source audit and technology decisions.
