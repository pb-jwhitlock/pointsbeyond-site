# Points Beyond AI Site - Current State

## Latest Status
- **Styling**: ✅ Fixed and deployed (Node 22 required for Astro)
- **Form Webhook**: ⚠️ ContactForm removed from homepage and /contact/ — SMS opt-in consolidated to chat widget only (A2P audit)
- **LeadConnector Chat Widget**: ✅ Live — async script in `Layout.astro`, widget ID `6a15b9c11ce15bb9e91d3f65` — this is the sole SMS opt-in
- **Schema Markup**: ✅ Extended — `contactPoint`, `CommunicateAction`, `WebSite/SpeakableSpecification` added to `orgSchema`
- **Favicon**: ✅ Points Beyond logo deployed — ICO, 16, 32, 180, 192, 512px PNGs in `public/`
- **Nav + Footer Logo**: ✅ Replaced placeholder SVG "A" with actual Points Beyond logo image (`/favicon-180.png`)
- **Cloudflare Auto-Purge**: ✅ GitHub Actions workflow purges Cloudflare automatically after every deploy
- **Last Deployment**: June 1, 2026

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

## Cloudflare Auto-Purge
- **Zone ID**: `4603d5bfe81b9fee030800d1d42ed680`
- **Secret**: `CLOUDFLARE_CACHE_PURGE_TOKEN` stored in GitHub repo secrets
- **Workflow**: `.github/workflows/deploy.yml` — `purge-cache` job runs after `deploy` job completes
- No manual purging needed going forward

## A2P SMS Audit Notes
- `ContactForm.astro` removed from `index.astro` (homepage) and `contact.astro`
- Single SMS opt-in is the LeadConnector chat widget on `/contact/`
- `ContactForm.astro` file is preserved — can be restored after audit if needed
- Homepage Get Started section replaced with CTA linking to `/contact/`

## Astro CSS Scoping — Important
- Component `<style>` blocks are scoped to that component only
- Class names defined in `FAQ.astro` (e.g. `.faq-inner`) do NOT apply when used in page files
- Solution: use inline styles or global CSS for cross-component layout

## Key Fixes (Prior Session — May 25, 2026)
1. Added missing `siteConfig` export to `src/data/config.ts`
2. Updated `package.json`: Node requirement from `>=22.12.0` to `>=18.0.0` (workflow compatibility)
3. Fixed GitHub Pages: Changed from `gh-pages` branch to `GitHub Actions` deployment source
4. Updated `.github/workflows/deploy.yml`: Changed `node-version: 18` to `node-version: 22` (Astro requirement)
5. Updated GHL webhook URL in `src/data/config.ts`

## Known Issues
- GHL webhook URLs changing frequently (investigate affiliate/plan changes)
- `ContactForm.astro` has `console.log('DEBUG: ...')` calls still in production — strip before treating form as final
- `SpeakableSpecification` CSS selectors (`.service-name`, `.hero-tagline`) need verification against actual component class names

## Last Session Summary (June 1, 2026)
- Removed ContactForm from homepage and /contact/ for A2P SMS audit — chat widget on /contact/ is now sole opt-in
- Added Points Beyond logo as favicon (all sizes) and replaced placeholder SVG "A" in nav and footer
- Wired up Cloudflare auto-purge to GitHub Actions deploy workflow — no more manual purging needed

## Next Steps
**Resume here:**
1. Verify logo and favicon are rendering correctly on live site after latest deploy
2. Add calendar embed to `/contact/` (slot ready in `contact.astro`)
3. Investigate GHL webhook URL instability — consider a stable wrapper endpoint
4. Strip `console.log('DEBUG: ...')` calls from `ContactForm.astro`
5. Verify `SpeakableSpecification` CSS selectors match actual class names in `Hero.astro` / `Services.astro`

**Soon:**
- Add GA4 (see `docs/leadconnector-ga4-tracking.md` for setup guide)
- Expand service pages from placeholder to full copy (`/services/voice-ai/`, `/services/reputation/`, `/services/aeo-seo/`)
- Terms page attorney sign-off
- Deploy Cloudflare auto-purge workflow to lemair-tennis repo

## Build & Deploy
- Build: `npm run build` (requires Node 22+)
- Deploy: Push to `main` branch → GitHub Actions auto-deploys → Cloudflare cache auto-purged
- Live site: https://pointsbeyond.ai

---
Last updated: June 1, 2026

## Skills Library
Repo: https://github.com/pb-jwhitlock/claude-skills
To load a skill, share the raw URL or paste the SKILL.md content at the start of the session.
