# Page Analysis · Submit Client (/partners/pipeline-ops/submit-client)

## Goal
Collect a qualified client intake (WhatsApp-first) with enough detail to route, review, and start a demo/build.

## Primary user
Partners submitting new client opportunities; ops reviewing intakes.

## Current state (repo)
- Multi-step wizard with many fields, progress meter, validation score, reviewer list, SLA note (8h). Data is local only.

## Target state & success
- Simple, optional-first intake: company name, contact (email/phone/WhatsApp), business description, services needed (quick chips), website/social link; optional budget range, expected value, company size, special requirements, file upload.
- Store submission in system of record + Airtable-style ops view; confirm receipt; show "Instant review" SLA.
- Success = submission accepted, reviewer assigned, next step shown (e.g., demo scheduling or doc request); user sees ref ID and can push to Workspace task.

## Content requirements
- Plain-language labels and helpers: "Share whatever you have now; you can edit later." WhatsApp/phone optional, social link optional, budget optional (Unknown allowed).
- SLA microcopy: "Instant review" (immediate triage on receipt).
- Upload compliance note for PII/docs.
- Confirmation page copy with ref ID, "We’ll DM on WhatsApp/phone," and CTAs (schedule demo, add files, push to Workspace).

## Data requirements
- Submit endpoint contract; storage to CRM/internal + Airtable view.
- Reviewer assignment rules (TBD) and surfaced assignee.
- Optional budget field supports “Unknown”.

## UX states to cover
- Loading/submitting; validation errors; success with next steps; failure and retry.
- Document upload progress/error.

## Copy/microcopy to draft
- "Fill in whatever you can now; you can change it later." helpers for phone/social/budget; SLA banner; compliance note; success confirmation.

## Open questions
- Do we auto-create a Workspace task/notification after submission?

## Risks / dependencies
- Needs backend contract and storage mapping; compliance review for file/PII handling.

---

## UI plan (proposed)

### Layout
- Header band with title, short value prop, "Instant review" badge, and privacy/compliance link.
- Wizard steps (reuse 5-step flow) but with pruned fields; mobile-friendly single column, desktop two-column.
- Right rail (desktop): SLA badge, reviewer hint, upload tips.

### Field set
- Required: WhatsApp phone, Contact name, Business description, Services needed (multi-select), One social link (URL), Consent checkbox (if needed).
- Optional: Budget (allow "Unknown"), Timeline, Documents upload, Additional context.
- Hidden/derived: Submission timestamp, Partner ID, Source.

### Validation & microcopy
- WhatsApp helper: "We’ll contact you here first."
- Social link helper: "Any channel—Instagram, LinkedIn, TikTok, site."
- Budget helper: "Pick a range or choose Unknown."
- SLA note: "Instant review—ops triages on receipt."
- Compliance note near uploads: "No sensitive IDs/PHI; PDFs preferred."

### Confirmation & next steps
- Success screen shows reference ID, expected first action ("We’ll DM on WhatsApp"), CTA "Schedule a demo" and "Add files".
- Offer toggle to push a Workspace task for the partner: "Track this submission in Workspace".

### Error/empty states
- Submission failure: inline alert with retry; keep form data.
- Upload failure: per-file error messaging with retry/remove.

### Data contract (minimal)
```ts
type SubmitClientPayload = {
  contactName: string;
  whatsapp: string;
  businessDescription: string;
  services: string[];
  socialLink: string;
  budget?: string;       // 'unknown' allowed
  timeline?: string;
  documents?: UploadedFile[];
  additionalContext?: string;
  partnerId: string;
};

type SubmitClientResponse = {
  id: string;
  status: "received" | "triage" | "needs-info" | "accepted";
  slaCommit: "instant";
  reviewer?: string;
};
```

### Telemetry/analytics
- Track validation errors per field and drop-off per wizard step.
- Track success-screen CTA clicks (demo scheduling, add files, push to Workspace).
