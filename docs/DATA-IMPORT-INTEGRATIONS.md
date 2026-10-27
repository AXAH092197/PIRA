# PIRA data imports and external integrations
Status: Product-owner requested, 2026-10-27. Design requirement; not implemented.

## Goals
Allow personal and business inventory to ingest order logs, register/POS logs, paper logs, spreadsheets, and supported third-party data tools. Keep integrations optional and permissions-scoped.

## Sources
- Purchase orders, supplier orders, delivery receipts, order history.
- Register/POS exports: sales, returns, cancellations, corrections, and relevant SKU-level transaction details.
- Paper logs via user-initiated scan/photo upload and OCR with manual review.
- CSV/XLSX uploads and provider APIs/webhooks where supported and authorized.

## Processing
1. Ingest into a staging area; preserve original source, provenance, import timestamp and workspace.
2. Validate format, detect duplicates, map source fields to normalized product/SKU/quantity/unit/date/location/currency fields.
3. Review OCR confidence, missing values, ambiguous SKUs and unknown units; never silently assume a match.
4. Reconcile purchases, receipts, sales, returns, transfers and adjustments as distinct event types. Sales do not always directly equal stock depletion.
5. Show a preview/diff and require authorized approval before committing changes.
6. Commit inventory movements atomically and write immutable audit events with source references.
7. Support correction/reversal, idempotent reimports, error reporting and import history.

## Security and privacy
- Enforce workspace/tenant isolation and least-privilege connector scopes.
- Encrypt stored credentials and sensitive records; never commit tokens or personal transaction data.
- Minimize and redact customer/payment information; do not ingest full card data.
- Set configurable retention and deletion policies; disclose external OCR/data processors.
- Validate uploads for file size, type and malicious content; rate-limit import endpoints.

## UI and Copilot
- Business: Integrations & Imports area with source status, mapping, reconciliation queue and audit history.
- Personal: simplified import flow.
- Copilot can explain discrepancies and propose actions but must request approval before changing records.

## Acceptance tests
Duplicate imports, malformed files, mismatched SKU, ambiguous OCR, refunds/returns, partial delivery, cross-tenant access, unauthorized connector, offline import, rollback and audit trail.

Provider-specific connectors and automatic synchronization are subject to API availability, permissions and explicit user authorization.
