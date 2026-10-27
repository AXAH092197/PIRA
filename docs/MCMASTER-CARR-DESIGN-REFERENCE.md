# McMaster-Carr reference study for PIRA
Date: 2026-10-27. Reference principles only; do not copy proprietary designs, assets, code or infrastructure.

## Publicly observable reference
McMaster-Carr's mobile app and website emphasize category-first catalog browsing, quick filtering, product detail specifications, ordering and order history. Official reference: https://www.mcmaster.com/mobile and https://apps.apple.com/us/app/mcmaster-carr/id611431035

## PIRA adaptations
- Spacious category-first inventory navigation and prominent search.
- Progressive disclosure: show essential summaries first, open details in dedicated pages or nonblocking panels.
- Search/filter by location, SKU, supplier, category, stock status and dates.
- Dedicated item details, movement and order history, reorder workflows.
- Mobile-first controls, consistent back navigation and location breadcrumbs.
- Keep business Copilot charts/tables dockable, nonmodal, and accessible.
- Support optional hands-free wake-word only while app is active; typed Copilot always available.
- Preserve existing PIRA visual identity rather than cloning McMaster-Carr.

## Hosting and operations
McMaster-Carr's internal production hosting architecture is not established by public mobile app feature pages. Do not assume its cloud provider, database, deployment or security architecture.
For PIRA evaluate: managed .NET API, managed relational database, object storage, CDN, TLS, monitoring, backups, staging/production separation, secret management, autoscaling, and disaster recovery. Select provider on cost, operational burden, compliance and reliability requirements.

## Validation
Prototype task flows, conduct mobile accessibility testing and usability tests, then benchmark response time and reliability. No claim that these features are implemented.
