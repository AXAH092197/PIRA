# Implementation Decisions — Pending Approval

## Recommended architecture
Modular monolith initially: frontend, backend API, persistence, background reminder worker, and explicit module boundaries. This limits unnecessary infrastructure until usage warrants scaling.

## Decisions to confirm
1. Original source language/framework and whether to preserve it.
2. Relational database choice and migrations.
3. Authentication/session provider vs first-party implementation.
4. Hosting, email delivery, reminder channels, and backups.
5. Subscription plan features and payment provider.
6. Session timeout defaults and business role matrix.

## Non-negotiable safeguards
Server-side authorization; verified email; strong credential handling; MFA for privileged actions; workspace isolation; audit trails; secrets outside Git; dependency review; test coverage.

This is a design proposal only, not a claim of implemented functionality.
