# Business Copilot: nonblocking live data views
Status: Product owner approved requirement, 2026-10-27. Not implemented.

## User experience
When a business user asks PIRA about sales, inventory, order or register logs, show an appropriate data table and/or chart in a persistent non-modal workspace panel. Do not obscure or lock the rest of the application.

- Dockable, resizable, minimizable and dismissible panel; desktop split-view or floating panel, mobile collapsible bottom sheet/tab that leaves navigation accessible.
- User can scroll, navigate, inspect source records, move between screens and perform permitted work while the panel remains available.
- Offer chart/table toggle, filters, date range, search, sorting, drill-down and export subject to permissions.
- Clearly label data source, selected workspace, units, currency, last successful refresh, and freshness state.
- Accessible keyboard navigation, focus management, screen-reader announcements, readable data table alternative, reduced-motion support.

## Data semantics
- Fetch authorized business records through the server with workspace/tenant scoping.
- Prefer streaming/subscriptions or polling only when source supports timely updates. Show new events incrementally without resetting user filters or scroll position.
- Distinguish live updates from periodic refresh or static imports; never claim real-time data for batch exports.
- If data is delayed, disconnected, incomplete or unavailable, display stale/offline/partial state and last refresh.
- Preserve source provenance and auditability; prevent double counting of refunds, voids, returns and duplicate imports.
- Use server-side aggregation for large datasets, pagination or virtualization for tables, and time-series chart downsampling where needed.

## Example
“PIRA, show today's sales and inventory changes” opens a sales trend visualization and an inventory movement table while keeping business navigation interactive.

## Security
- No cross-tenant data leakage, no privileged action solely through voice, no background audio after app inactive.
- Mask sensitive transaction/customer information; authorize all drill-down and exports.
- Confirmation before inventory-changing Copilot actions.

## Acceptance
Test simultaneous navigation and live updates, resize/dock/minimize, mobile interaction, keyboard/screen reader, stale source labeling, permissions, and high-volume event streams.
