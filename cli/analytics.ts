import { askText, askConfirm, printSection, printSuccess, printHint, printNext } from "./_shared/prompts.ts";
import { writeText } from "./_shared/files.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║          CONTENTY — Analytics & Tracking Setup           ║
╚══════════════════════════════════════════════════════════╝
`);

// ── 1. GTM Container ─────────────────────────────────────

printSection("1/4 — Google Tag Manager", "GTM is the recommended way to manage all tracking tags.");

printHint(
  'Your GTM container ID looks like: GTM-XXXXXXX\n' +
  '     Get one at https://tagmanager.google.com\n' +
  '     Press Enter to skip if you don\'t have one yet.',
);
const gtmId = await askText("GTM container ID (optional)", "");

// ── 2. GA4 Property ──────────────────────────────────────

printSection("2/4 — Google Analytics 4", "GA4 measurement ID for core analytics.");

printHint(
  'Your GA4 measurement ID looks like: G-XXXXXXXXXX\n' +
  '     This should be configured inside GTM, not hardcoded.\n' +
  '     Press Enter to skip if you don\'t have one yet.',
);
const ga4Id = await askText("GA4 measurement ID (optional)", "");

// ── 3. Conversion events ─────────────────────────────────

printSection("3/4 — Conversion Events", "Define what you want to track as conversions.");

console.log("  Recommended conversion events for a business website:\n");
console.log("  ┌─────────────────────────────────────────────────────────┐");
console.log("  │ Event                  │ Trigger                        │");
console.log("  ├─────────────────────────────────────────────────────────┤");
console.log("  │ form_submit            │ Contact form submitted          │");
console.log("  │ cta_click              │ Primary CTA button clicked      │");
console.log("  │ phone_click            │ Phone number link clicked       │");
console.log("  │ email_click            │ Email link clicked              │");
console.log("  │ scroll_depth_90        │ User scrolled 90% of page      │");
console.log("  │ page_view_solutions    │ Solutions page viewed           │");
console.log("  │ page_view_contact      │ Contact page viewed             │");
console.log("  │ file_download          │ PDF or resource downloaded      │");
console.log("  └─────────────────────────────────────────────────────────┘\n");

const addCustomEvents = await askConfirm("Add custom conversion events?", false);
let customEvents: string[] = [];
if (addCustomEvents) {
  printHint('Enter events comma-separated. Example: demo_request, pricing_view, chat_open');
  const { List } = await import("@cliffy/prompt");
  customEvents = await List.prompt({ message: "Custom events" });
}

// ── 4. Additional tracking ───────────────────────────────

printSection("4/4 — Additional Tracking", "Other tracking and compliance considerations.");

const hasSearch = await askConfirm("Set up Google Search Console verification?", true);
const hasCookieConsent = await askConfirm("Need cookie consent banner?", true);
const hasFbPixel = await askConfirm("Set up Meta (Facebook) Pixel?", false);

// ── Write analytics decision doc ─────────────────────────

const doc = `# Analytics & Tracking Setup

## Google Tag Manager
- Container ID: ${gtmId || "(not set yet)"}
- Implementation: Add GTM snippet to \`website/routes/_layout.tsx\` in <head> and <body>

## Google Analytics 4
- Measurement ID: ${ga4Id || "(not set yet)"}
- Configuration: Set up as a GA4 tag inside GTM (not hardcoded)

## Conversion Events

### Standard events (recommended)
| Event | Trigger | Priority |
|---|---|---|
| form_submit | Contact form submitted | High |
| cta_click | Primary CTA button clicked | High |
| phone_click | Phone number link clicked | Medium |
| email_click | Email link clicked | Medium |
| scroll_depth_90 | User scrolled 90% of page | Low |
| page_view_solutions | Solutions page viewed | Medium |
| page_view_contact | Contact page viewed | High |
| file_download | PDF or resource downloaded | Medium |
${customEvents.length > 0 ? `
### Custom events
${customEvents.map((e) => `| ${e} | (define trigger in GTM) | Medium |`).join("\n")}
` : ""}
## Additional tracking
- Google Search Console: ${hasSearch ? "Yes — add verification meta tag" : "No"}
- Cookie consent: ${hasCookieConsent ? "Yes — implement consent banner before GTM fires" : "No"}
- Meta Pixel: ${hasFbPixel ? "Yes — configure via GTM" : "No"}

## Implementation checklist
- [ ] Create GTM container and get container ID
- [ ] Add GTM snippet to website layout
- [ ] Configure GA4 tag in GTM
- [ ] Set up conversion events in GTM
- [ ] Mark primary conversions in GA4
${hasSearch ? "- [ ] Add Search Console verification meta tag" : ""}
${hasCookieConsent ? "- [ ] Implement cookie consent banner\n- [ ] Configure GTM to respect consent mode" : ""}
${hasFbPixel ? "- [ ] Configure Meta Pixel via GTM" : ""}
- [ ] Test all events in GTM Preview mode
- [ ] Verify data flowing in GA4 Realtime report

## Notes
- Never hardcode tracking scripts — always use GTM
- Ensure cookie consent fires before any tracking tags
- Test with GTM Preview mode before publishing
- Set up GA4 key events for primary conversions
`;

await writeText("docs/decisions/analytics.md", doc);
printSuccess("Wrote docs/decisions/analytics.md");

printNext(
  "Implement the GTM snippet in your website layout:\n" +
  '  Tell your AI: "Add GTM to website/routes/_layout.tsx using docs/decisions/analytics.md"',
);
