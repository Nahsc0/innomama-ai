# InnoMama AI

**A clearer signal. A safer beginning.** An InnoHealth Technologies maternal-health research prototype for Northern Nigeria.

## Problem statement and motivation

Maternal care depends on both a woman's condition and the facility's ability to respond. Routine records and inventories often sit apart, obscuring missing observations, supplies or referral resources. InnoMama explores a connected early-warning workspace for primary healthcare teams. The motivating question is whether time-linked signal-function indicators add useful information to maternal observations when identifying elevated risk of defined complications.

This demo does **not** predict survival, maternal death, or a successful delivery. It uses transparent illustrative rules on synthetic data. No model has been trained or clinically validated. The AI name describes the intended research direction. Do not use this prototype to make clinical decisions or enter real patient data.

## Research foundation

Tomlin and colleagues (2020) assessed routine-care readiness with four functions: labour monitoring, third-stage care, infection prevention and clean cord care. Every required component must be present. Deliveries were linked to facility readiness to measure coverage. The app reproduces that historical checklist, including its oxytocin-or-ergometrine definition; missing or unknown components fail readiness. The checklist is a measurement definition, not prescribing guidance. [Paper and full methods](https://doi.org/10.1186/s12884-020-02926-8).

The additional indicators are proposed extensions, kept distinct from that checklist:

| Evidence | Contribution | Limitation |
| --- | --- | --- |
| [Payne et al., miniPIERS, 2014](https://doi.org/10.1371/journal.pmed.1001589) | Maternal observations, symptoms, parity, gestation and outcome-window design | Hypertensive-disorder population; not a general maternal mortality model |
| [Yang et al., PIERS-ML/fullPIERS, 2025](https://doi.org/10.1371/journal.pmed.1004509) | Repeated assessment requires validation over time | Performance at admission cannot simply be assumed to persist |
| [Maternal Early Warning Criteria, 2014](https://doi.org/10.1097/AOG.0000000000000480) | Physiological trigger precedent | App rules are an illustrative subset and additions, not a validated implementation |
| [WHO antenatal care, 2016](https://www.who.int/publications/i/item/9789241549912) | Eight-contact care context | Contact timing and care quality matter; count alone is not a risk model |
| [WHO postpartum haemorrhage guidance, 2025](https://www.who.int/publications/i/item/9789240115637) | Track uterotonic availability, including misoprostol, separately | Stock, actual administration, indications and outcomes must remain distinct |
| [WHO emergency obstetric care handbook](https://www.who.int/publications/i/item/9789241547734) | Actual performance matters for emergency functions | Supplies alone do not establish EmONC performance |

Three open-access paper PDFs were downloaded locally (excluded from public Git and deployment) into `research/`: the motivating Tomlin paper, miniPIERS, and the 2025 PIERS study. Their publisher links remain in the app. See [research notes](research/NOTES.md) for the evidence map and research protocol outline. This is a focused implementation review, not a systematic literature review.

## Process

1. Capture a synthetic maternal assessment and associate it with a synthetic facility.
2. Evaluate the four routine-care functions using all-components-required logic.
3. Check configured maternal observations, contextual care gaps and missingness separately.
4. Display reasons in an ordered review queue. Urgent observed triggers take precedence over missing data; missing data otherwise receive an incomplete status.
5. Let a tester edit inventory, update review status, inspect the activity log and export the demo state.

The dashboard's delivery-weighted readiness is the share of synthetic facility deliveries associated with facilities meeting all four historical functions. It is not a probability of survival. All charts and counts derive from the current demo records.

## Actions and expected results

The intended workflow makes a missing signal visible, supports clinical review and helps coordinate readiness improvements. In this demo, a systolic pressure of 166 produces an urgent trigger; an unknown oxygen saturation yields an incomplete assessment; absent skilled attendance makes all four functions incomplete. Changing a facility inventory recalculates linked priorities immediately. Review acknowledgement never suppresses a trigger. Referral status is a simulation and sends no messages.

Demo triggers: systolic BP ≥160 or <90; diastolic BP ≥110; pulse >120 or <50; respiratory rate >30 or <10; oxygen saturation <95%; reported bleeding, seizure or breathlessness yield Urgent. Temperature ≥38 or <36, intermediate elevated BP, headache/visual disturbance, prior complications, haemoglobin <11, fewer than eight ANC contacts at ≥36 weeks, incomplete routine functions or unconfirmed transport yield Review unless superseded. Missing required observations produce Incomplete unless urgent signs are present. These thresholds and routing are not a complete clinical protocol; local specialist review is required.

No clinical effectiveness results exist. Seven automated tests verify critical rule behavior; browser testing verifies the interface and workflows. This demonstrates a usable product concept, not evidence that the app prevents mortality.

## Product features

- Responsive overview, maternal registry, priority filters and record search.
- New assessments and editable observations with numeric constraints and missing-value handling.
- Explainable maternal priorities and original routine-care readiness checklist.
- Editable facility stock including misoprostol, magnesium sulphate, antibiotics, newborn resuscitation and transport.
- Review coordination status, browser-local activity history, JSON export and demo reset.
- Evidence library with downloaded papers and an explicit AI validation pathway.

## Run and test

Requires Node.js 20 or later; no package installation or API key is needed.

```sh
npm start
# Open http://127.0.0.1:4173
npm test
npm run build
```

`dist/` is the deployable static app. The GitHub Actions workflow tests, builds and deploys it to GitHub Pages. In repository Settings → Pages, choose GitHub Actions. All asset paths are relative, supporting project-site hosting.

## Architecture and data

Buildless HTML, CSS and JavaScript modules; pure assessment logic in `engine.js`, synthetic fixtures in `data.js`, interface and browser storage in `app.js`. Local storage retains the demo on the same browser. No authentication, backend, remote database, real-time integration or notification service exists. Fonts may load from Google Fonts, with system fallbacks. The local server is for development only.

Public GitHub Pages hosting is appropriate for this synthetic demonstration. It is not a production clinical data platform. A future deployment needs secure identity and role permissions, encrypted clinical storage, monitored services, provenance, consent/governance, regulatory review and a clinician-owned escalation protocol. The local activity log is editable browser data, not a tamper-evident clinical audit trail.

## Research pathway to meaningful AI

Define population, index time and outcomes before modelling. Proposed primary endpoint: adjudicated severe maternal morbidity within a pre-specified short horizon, with mortality through 42 days analysed separately. Define newborn endpoints separately. Recruit enough events for model development and validation rather than relying on the number of records alone. Capture parity, proteinuria and relevant laboratory values in a governed research dataset; the demo does not yet collect all candidate predictors.

Collect prospective patient-to-facility linkage, time-stamped measurements, ANC timing/content, prior history, actual care administered, repeated inventories, staffing, stock expiry/cold-chain integrity, referral travel time and follow-up after transfer/discharge. Never infer that stocked medicine was administered. Avoid leakage from delivery or treatment data recorded after the prediction time. Treatment variables may reflect illness severity, creating confounding by indication.

Compare a pre-specified clinical baseline, regularised regression and suitable machine-learning models. Use facility-grouped and temporal splits, training-only imputation, calibration assessment, sensitivity, specificity, precision, PR-AUC, decision-curve utility and confidence intervals. Evaluate subgroup and missingness performance. Externally validate in other facilities and states, run prospective silent testing and assess clinical impact before adoption. Include alert fatigue, workload and safe fallback processes.

## Ownership

Product concept: **InnoMama AI by InnoHealth Technologies**. Branding is provisional and has not undergone a trademark clearance. Third-party papers retain their own licenses; app source and downloaded publications are distinct works.

