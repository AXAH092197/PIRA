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

## Supabase account portal setup

1. Open Supabase SQL Editor and run `supabase/001_foundation.sql` in your project. This creates profiles, personal workspaces, inventory/reminder tables and RLS policies.
2. In Supabase project settings, copy the **Project URL** and the **publishable** API key into `supabase-config.js` (never a secret or service-role key).
3. In Supabase Authentication → URL Configuration, set the Site URL to your deployed site and allow the exact redirect URL ending in `/auth.html`.
4. Enable email confirmation under Authentication. Confirm your email after registration.
5. Publish with GitHub Pages and open `auth.html`. Newly registered accounts receive one personal workspace automatically.
6. Before creating real accounts, verify RLS using two test users: neither should be able to read or update the other's workspace rows.

**Security boundary:** `auth.html` handles actual Supabase registration/sign-in only after configuration. The original `index.html` still runs as a **legacy, local-only prototype** and is NOT protected by Supabase. Do not put sensitive data there. Business registration/verification, account-to-inventory sync, and admin controls have not been implemented. Password complexity checks in the registration UI are supplemental client-side checks, not server-side enforcement; enforce password policies in Supabase Auth settings / trusted backend before production. Supabase's email sending limits may apply.

Ensure Data API privileges for RLS-secured tables: grant SELECT on profiles, workspaces, memberships and SELECT/INSERT/UPDATE/DELETE on inventory_items and reminders to authenticated, then test under RLS. Do not grant workspace/membership write permissions to browser roles.

## Authenticated Personal dashboard (milestone 2)

- Open `auth.html` to sign in, then follow **Open Personal Workspace** to `app.html`.
- `app.html` reads the authenticated Supabase session and finds the authorized Personal workspace through `memberships` + `workspaces`.
- Inventory and reminders are loaded from Supabase, with create/edit/delete, low-stock metrics, category search, CSV export, and local rule-based Copilot.
- **Run migrations 001 and 002 first.** Supabase enforces access using table grants and workspace Row Level Security. This new page does not store records in browser localStorage.
- `index.html` remains a separate legacy local demo. There is **no migration of existing local records** into Supabase and Business workflow is not yet integrated.
- Do not expose service-role or secret keys. Test with two distinct accounts before real use. Publishing the dashboard is not proof of completed authorization or penetration testing.

## Integrations center (milestone 3)

Open `integrations.html` from the authenticated dashboard toolbar.

**Built-in integrations and boundaries**
- Internal: reads pending PIRA reminders through signed-in Supabase membership and RLS. No extra credentials, no writes from integration hub.
- Inbound: imports a user-selected `.ics` file to an ephemeral in-page events view (up to 1 MB / 500 events). Does not upload the file or persist imported events. Basic one-off dates only; no recurrence expansion or full timezone interpretation.
- External: Open-Meteo current weather only after browser geolocation consent. Coordinates remain in page memory but are sent to Open-Meteo on demand. Free API is for **non-commercial** usage; review commercial licensing before monetizing PIRA.
- External: Google Calendar **read-only** upcoming events through user-triggered Google Identity Services OAuth. To activate: create a Google Cloud project, enable the Calendar API, configure the OAuth consent screen, create a Web OAuth client with `https://axah092197.github.io` as an authorized JavaScript origin, and set `GOOGLE_CALENDAR_CLIENT_ID` in `integrations-config.js`. OAuth client IDs are public identifiers, not secret credentials. Without this setup the UI reports that Google Calendar is unavailable.
- Google OAuth access tokens are kept in memory only. Users can disconnect and revoke the current token. Expiration requires a new user-driven consent request. Calendar data is not automatically synchronized across sessions.
- The registry is a **fixed allowlist** of provider adapters, not a dynamic third-party plugin loader. No arbitrary external scripts, outbound customer data transfer, automated event writes, background polling, or webhook integration are supported. Future external plugin support requires reviewed manifests, provider authorization, granular scopes, sandboxing and server-side secret handling.

**Privacy/security:** External integrations are independent of Supabase inventory access. Calendar consent does not grant inventory privileges. RLS must remain enforced. Integration UI reads only available data and does not claim to save reminders or calendar events. Validate Google OAuth consent screen and production requirements before public release.
