# Points Beyond AI Site - Current State

## Latest Status
- **Styling**: ✅ Fixed and deployed (Node 22 required for Astro)
- **Form Webhook**: Testing with latest URL — GHL URLs regenerating daily, needs stable solution
- **LeadConnector Chat Widget**: ✅ Live — async script in `Layout.astro`, widget ID `6a15b9c11ce15bb9e91d3f65`
- **Schema Markup**: ✅ Extended — `contactPoint`, `CommunicateAction`, `WebSite/SpeakableSpecification` added to `orgSchema`
- **Last Deployment**: May 26, 2026 — chat widget + schema markup live

## Current Config
**File**: `src/data/config.ts`

```typescript
export const formConfig = {
  endpoint: "https://services.leadconnectorhq.com/hooks/kCwBYibHdMHe4b5OQqHh/webhook-trigger/a6ca810c-1da6-42ca-8cd6-705ba638348e",
  method: "POST" as const,
} as const;
```

## Chat Widget
- **Widget ID**: `6a15b9c11ce15bb9e91d3f65`
- **Script**: `https://widgets.leadconnectorhq.com/loader.js`
- **Data URL**: `https://widgets.leadconnectorhq.com/chat-widget/loader.js`
- **Placement**: `Layout.astro` lines ~119–125, before external tracking script, using `async`
- **Reference docs**: `docs/leadconnector-ga4-tracking.md`, `docs/leadconnector-widget-reference.md`

## Key Fixes (Prior Session — May 25, 2026)
1. Added missing `siteConfig` export to `src/data/config.ts`
2. Updated `package.json`: Node requirement from `>=22.12.0` to `>=18.0.0` (workflow compatibility)
3. Fixed GitHub Pages: Changed from `gh-pages` branch to `GitHub Actions` deployment source
4. Updated `.github/workflows/deploy.yml`: Changed `node-version: 18` to `node-version: 22` (Astro requirement)
5. Updated GHL webhook URL in `src/data/config.ts`

## Known Issues
- GHL webhook URLs changing frequently (investigate affiliate/plan changes)
- Form submissions need to be tested against current webhook URL
- `ContactForm.astro` has `console.log('DEBUG: ...')` calls still in production — strip before treating form as final
- `SpeakableSpecification` CSS selectors (`.service-name`, `.hero-tagline`) need verification against actual component class names

## Last Session Summary (May 26, 2026)
- Integrated LeadConnector chat widget into `Layout.astro` with async loading (widget ID `6a15b9c11ce15bb9e91d3f65`)
- Extended `orgSchema` in `Layout.astro` with `contactPoint`, `CommunicateAction` potentialAction, and `WebSite/SpeakableSpecification` nodes for voice search / AEO
- Created reference docs: `docs/leadconnector-ga4-tracking.md` (GA4 event setup) and `docs/leadconnector-widget-reference.md` (testing checklist + Core Web Vitals perf guide)

## Next Steps
**Resume here:**
1. Verify chat widget is visible on live site: https://pointsbeyond.ai (bubble bottom-right)
2. Test live form submission end-to-end — verify all fields land in GHL CRM (`firstName`, `lastName`, `phone`, `service_interest`, `sms_consent`)
3. Investigate GHL webhook URL instability — consider a stable wrapper endpoint
4. Strip `console.log('DEBUG: ...')` calls from `ContactForm.astro` before treating form as production-ready
5. Verify `SpeakableSpecification` CSS selectors match actual class names in `Hero.astro` / `Services.astro`

**Soon:**
- Add calendar embed to `/contact/` (slot ready in `contact.astro`)
- Add GA4 (see `docs/leadconnector-ga4-tracking.md` for setup guide)
- Expand service pages from placeholder to full copy (`/services/voice-ai/`, `/services/reputation/`, `/services/aeo-seo/`)
- Terms page attorney sign-off

## Build & Deploy
- Build: `npm run build` (requires Node 22+)
- Deploy: Push to `main` branch → GitHub Actions auto-deploys
- Live site: https://pointsbeyond.ai

---
Last updated: May 26, 2026
