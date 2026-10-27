# PIRA Copilot — Query Intelligence and Analytics
Status: Approved expansion of limited keyword-response prototype; initial deterministic interpreter is a development component, not a production AI model.

## Objectives
Understand multiple natural-language phrasings and follow-up questions about personal inventory, business inventory, sales, revenue, costs, quantities, trends, reorder, and discrepancies. Do not invent data, conflate revenue with profit, or claim demo records are live.

## Pipeline
1. Identify authorized workspace, user role, data source and freshness.
2. Normalize utterance and extract metric, entity/SKU, aggregation, dimensions, period, comparison, filters, and requested presentation.
3. Resolve conversational references and follow-up modifications (e.g., 'and last month?', 'by category?', 'what about batteries?').
4. Resolve ambiguities with a focused question; never silently substitute sales for profit, on-hand for available, or inventory value for sales value.
5. Produce a structured query plan validated against a strict allowlist of supported operations and dimensions. Do not run arbitrary SQL or execute free-form model output.
6. Fetch only authorized tenant-scoped data; use parameterized queries, audited endpoints and validated units/currency/time zones.
7. Calculate deterministic totals, trends, margins, velocity and reorder proposals. Label assumptions and partial/stale records.
8. Respond with concise text and optional accessible table/chart, source/date/units, with drill-down.
9. Require explicit confirmation and server-side authorization for any data mutation.

## Supported metrics and language
- Inventory: on-hand, available, reserved, incoming, min-stock, location, cost valuation, age, movements.
- Sales: gross sales, net sales, revenue, returns, voids, discounts, tax, units, orders, average order value, top/bottom products.
- Finance: cost of goods sold and gross profit ONLY when relevant costs are present; no fabricated net profit.
- Time: today, yesterday, this week, last week, month-to-date, last month, custom dates; use workspace timezone.
- Grouping: SKU, category, supplier, location, store, day/week/month, channel when supported.
- Comparison: previous period, category vs category, SKU vs SKU, actual vs reorder minimum, percent changes.
- Trends: ranked velocity, moving averages and seasonality only with sufficient observations; report insufficiency otherwise.
- Question paraphrases: how much, how many, total, sum, amount, count, compare, highest, lowest, trend, pattern, when, where, why.
- Follow-up context must be scoped to workspace and session, and reset when permissions or workspace change.

## Response contract
Each result should carry intent, metric, filters, period, grouping, provenance, freshness, result, units/currency, assumptions, warnings, and suggested next questions. Typed Copilot is always available; voice uses same authorized query pipeline. Charts have accessible table alternatives.

## Security
Never expose another tenant's data. No direct SQL from model output. No cross-workspace conversational leakage. Minimize stored prompts and sensitive transaction/customer data. Rate-limit and audit sensitive access.

## Acceptance tests
Paraphrase equivalence; inventory quantity by name/SKU; ambiguous 'how much'; revenue vs profit; today/last month; grouped sales; returns/voids; comparison and percentage; missing cost; unknown SKU; insufficient trend history; workspace switch; permission denial; stale data; zero denominators; prompt injection; confirmation for mutation.

## Delivery
Stage 1 deterministic intent/slot parser and tests; Stage 2 authorized analytics API and structured query plan; Stage 3 optional model-assisted parsing with schema validation, evaluation set, audit and safe fallback.
