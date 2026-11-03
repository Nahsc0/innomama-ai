# Change log

## 1.2.0 — 3 November 2026

- Added regional analytics: interactive Nigeria state map, urgency donut, care-gap, routine-readiness, ANC and gestation charts, intersected state/facility/urgency/indicator filters and filtered JSON export.
- Expanded the same synthetic Google register to 160 assessments and 41 facilities across 19 northern states plus FCT; retained original Gombe rows. Added state and illustrative coordinates with schema validation and backward compatibility.
- Added the named Signal Priority Rules v1.2.0 explanation and thresholds in the app. No trained-model or outcome-probability claim was introduced.
- Added automatic browser-local urgent escalation simulation, per-facility officer forms, validated dummy-contact CSV import/template, message previews, recommended response workflow, deduplication and acknowledgement tracking. No actual SMS delivery service is connected.
- Preserved separate connected/sandbox alert histories; kept contact details out of public source data.
- Added focused analytics/escalation tests and documented geography licensing, chart denominators, source migration, SMS limitations and production prerequisites.

## 1.1.0 — 3 November 2026

- Applied InnoHealth reference colours (cobalt, midnight blue, white and a green connection accent), an adapted wordmark and the maternal-health theme.
- Created a native synthetic Google Sheet with Maternal_register, Facilities and Guide tabs. Read-only link access was enabled with the owner's explicit approval.
- Added scheduled Google CSV ingestion, strict schema and join validation, timestamp/hash provenance and GitHub Pages deployment.
- Added one-minute app polling, a manual feed check, cached-data fallback, connection/delay indicators and separate Connected register / Local sandbox modes.
- Documented source ownership, refresh latency, privacy boundaries, troubleshooting and the path from this simulation to a governed NHMIS integration in README.
- Verified 15 automated tests, all three native Sheet layouts, desktop/mobile rendering and sandbox isolation. Changed a dummy Sheet systolic pressure from 118 to 165, ingested it, and confirmed the app displayed 165/76 with an urgent reason; restored 118 and re-ingested. Invalid snapshots were rejected without overwriting the last accepted data.

## 1.0.0 — 3 November 2026

- Initial synthetic maternal signal-surveillance prototype, research downloads, evidence documentation, local workflows and GitHub Pages hosting.
