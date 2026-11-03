# Change log

## 1.1.0 — 3 November 2026

- Applied InnoHealth reference colours (cobalt, midnight blue, white and a green connection accent), an adapted wordmark and the maternal-health theme.
- Created a native synthetic Google Sheet with Maternal_register, Facilities and Guide tabs. Read-only link access was enabled with the owner's explicit approval.
- Added scheduled Google CSV ingestion, strict schema and join validation, timestamp/hash provenance and GitHub Pages deployment.
- Added one-minute app polling, a manual feed check, cached-data fallback, connection/delay indicators and separate Connected register / Local sandbox modes.
- Documented source ownership, refresh latency, privacy boundaries, troubleshooting and the path from this simulation to a governed NHMIS integration in README.
- Verified 15 automated tests, all three native Sheet layouts, desktop/mobile rendering and sandbox isolation. Changed a dummy Sheet systolic pressure from 118 to 165, ingested it, and confirmed the app displayed 165/76 with an urgent reason; restored 118 and re-ingested. Invalid snapshots were rejected without overwriting the last accepted data.

## 1.0.0 — 3 November 2026

- Initial synthetic maternal signal-surveillance prototype, research downloads, evidence documentation, local workflows and GitHub Pages hosting.
