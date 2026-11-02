# PIRA — Personal Inventory & Reminder Application

A responsive browser prototype for managing separate Personal and Business workspaces.

## PIRA website

Open `welcome.html` for the public-facing responsive product website. It links to the interactive prototype in `index.html`. The preview metrics on the website are illustrative and not user data.

## Run locally

Open `index.html` in a modern browser. No installation or build step is required.

## Features

- Personal and Business workspaces with independent locally stored records
- Inventory creation, editing, deletion, search, categories, quantities, minimum stock thresholds, and unit values
- Reminder creation, completion, and deletion
- Business-only supplier order documentation with entered subtotals and tax/fees (no order fulfillment)
- Dashboard totals and low-stock indicators
- Local rule-based Copilot queries with optional browser-supported speech recognition
- CSV exports for inventory, reminders, and orders; CSV inventory import
- Responsive mobile layouts, dark mode, larger text, and keyboard focus styling

## Important prototype limitations

**This is not a production-ready application.** Data resides in browser `localStorage`, which can be lost when browser data is cleared and is **not encrypted, backed up, or synchronized**. Switching workspaces is not identity verification. Do not store sensitive customer, personal, business, or financial information here. The Copilot uses fixed local rules rather than a hosted AI model. Voice features depend on the browser's speech recognition capabilities and privacy behavior. Taxes and fees are manual fields, not validated jurisdictional calculations. CSV import should be used only with trusted files.

## Roadmap

1. Backend service, database and secure authenticated sessions with server-enforced Personal/Business isolation
2. Account registration, secure email verification, 2FA, permission/role enforcement, audit logs and timeouts
3. Business verification workflow, with protected verification codes and business-specific access controls
4. Accessible, secure Copilot integrations and optional voice functionality
5. Subscription plans, payment integration, reporting and scoped administrative controls
6. Data portability, backup/recovery, secure exports and automated testing

## Host using GitHub Pages

In GitHub, visit **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. Pages deployment is not managed by this repository commit; availability depends on your GitHub settings. Public GitHub Pages would make this prototype available publicly. It is not suitable for storing sensitive data.
