# Evidence and implementation notes

Reviewed 3 November 2026. Scope: targeted evidence for a dummy-data maternal surveillance prototype; no systematic-review completeness claim.

## Downloaded sources

| Local file | DOI | Review use |
| --- | --- | --- |
| `tomlin-2020.pdf` | 10.1186/s12884-020-02926-8 | Full methods and Table 1 for exact routine-care component mapping |
| `minipiers-2014.pdf` | 10.1371/journal.pmed.1001589 | Prospective hypertensive-pregnancy model, candidate predictors and 48-hour adverse-outcome framing |
| `piers-ml-2025.pdf` | 10.1371/journal.pmed.1004509 | Serial prediction and limitations of extending an admission model over time |

Downloaded from publisher PDF endpoints; file headers verified as PDF. Accessible publisher/PMC full-text methods were reviewed. The source model equations have not been implemented or revalidated.

## Method-to-product mapping

- Historical facility components are encoded explicitly in `engine.js`, including the uterotonic requirement within labour monitoring. Misoprostol does not silently substitute into the source checklist.
- Extended stock indicators appear beside the original checklist but do not imply emergency-care performance. Transport availability contributes to a demo care-gap review; other extended stocks are informational.
- Physiological triggers form a separate illustrative rule layer; no weighted point score or fabricated outcome probability is presented.
- Missing inputs are unknown, never automatically normal. ANC is a care-context review flag near term, not an independent mortality classifier.
- No adverse delivery outcome was generated as ground truth; the synthetic records are scenarios for testing functionality.

## Proposed longitudinal data model

Use pseudonymous patient, pregnancy, encounter, facility and referral identifiers; event time, recording time, measurement units and provenance; staffing/stock snapshots with validity windows; ANC contact dates and services; maternal and newborn outcomes with adjudication, definition and follow-up completeness. Separate drug availability, administration, dose/route/time and contraindications. Track observation missingness and reasons, transfer outcomes, near miss and mortality ascertainment. Link snapshots available at the prediction time rather than a later survey.

## Feasibility and next actions

Partner with Northern Nigerian PHCs and referral hospitals; audit routine records and maternal-death surveillance completeness; co-design labels with obstetric specialists; assess linkage and follow-up feasibility; develop an ethically approved protocol and statistical analysis plan; determine sample size from anticipated events, candidate parameters and precision needs. Establish referral capacity and responsibility for alerts before testing clinical use.

The original paper provides a readiness measure. It cannot establish that changing a supply causes a specific woman's outcome or that its historical checklist is sufficient for current care. The hypertensive-pregnancy studies address narrower populations than the proposed all-maternity application. Broader use and any AI predictions require new validation.
