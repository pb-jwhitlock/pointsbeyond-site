# Points Beyond AI — pointsbeyond-site

## Overview

Company website for **Points Beyond AI** / Points Beyond LLC (John Whitlock).
AI services consultancy in Fairfax County, VA — three core services: AI Voice Agents, Reputation Management, AEO + SEO.

- **Live domain**: https://pointsbeyond.ai — currently served from `points-beyond-frontend-1` (plain HTML, legacy)
- **This repo**: `pb-jwhitlock/pointsbeyond-site` — clean Astro 6 rebuild, replaces `pb-jwhitlock/points-beyond`
- **Local directory**: `~/pointsbeyond-site/`

## Stack

- **Framework**: Astro 6.x (static output, SSG)
- **Fonts**: Urbanist (primary, headings + body) + Inter (secondary) via Google Fonts
- **Styling**: Raw CSS in `.astro` component `<style>` blocks — no Tailwind, no CSS framework
- **TypeScript**: `tsconfig.json` strict mode
- **No content collections** — all content inline in `.astro` files
- **Single layout**: `Layout.astro` — dark sections handled per-component, not via a separate layout file
- **Pricing**: Always import from `src/data/pricing.ts` — never hardcode a price anywhere

## Visual Direction

Inspired by Subduxion (subduxion.com). Key principles:

- **High contrast**: deep dark text on white. `#2e1f7a` is the single accent color.
- **Typography hierarchy**: clamp(40px, 6vw, 80px) for H1. Large display sizes for headlines.
- **Whitespace is the design**: 120px top/bottom section padding on desktop, 64px on mobile.
- **Sans-serif only**: Urbanist throughout. No serif mixing.
- **Body copy**: minimum 16px, preferred 18px. Never tiny.
- **No animations in v1**: static is fine for launch.
- **No stock photography of people in v1**: typography and whitespace carry the design.
- **Buttons**: solid `#2e1f7a` primary (white text), ghost/outlined secondary. Generous padding: 16px vertical, 32px horizontal. Subtle hover (slight darkening only, no scale/shadow).
- **Cards**: clear hierarchy — large service name, 2-3 sentence description, deliverables list, pricing line, CTA. No shadows, no gradients, restrained borders.
- **Restraint over decoration**: no gradients on text, no shadows on cards, no excessive borders.

### CSS Variables (defined in Layout.astro :root)

**Light sections:**
- `--color-primary: #2e1f7a`
- `--color-primary-dark: #1e1450`
- `--color-bg: #ffffff`
- `--color-text: #0f1e2e`
- `--color-text-muted: #4a5568`
- `--color-border: #e2e4e6`
- `--color-card-bg: #f8f9fa`
- `--color-card-border: #e2e4e6`
- `--color-card-hover: #f0f0f5`
- `--color-accent: #2e1f7a`
- `--color-accent-rgb: 46, 31, 122`
- `--color-surface: #f4f5f6`

**Dark sections (Process section, Footer):**
- `--color-dark-bg: #0e0e10`
- `--color-dark-text: #f5f5f5`
- `--color-dark-text-muted: #a0a0b0`
- `--color-dark-card-bg: #18181c`
- `--color-dark-border: #2a2a35`

### Section Light/Dark Map

| Section | Background |
|---|---|
| Hero | LIGHT (white) |
| Pain Points | LIGHT |
| Services | LIGHT |
| Process / How It Works | **DARK** — `#0e0e10` |
| Testimonials | LIGHT |
| FAQ | LIGHT |
| Contact / Booking | LIGHT |
| Footer | **DARK** — matches Process background |

### Mobile Breakpoints (test before declaring any section "done")

| Breakpoint | Width |
|---|---|
| iPhone SE | 375px |
| iPhone Pro | 414px |
| Tablet | 768px |

### Mobile Padding Rules

- **Section padding**: 80px top/bottom desktop → 48px mobile (revised down from 120px/64px during build for visual balance)
- **Hero top**: 60px desktop → 32px mobile; hero `padding-bottom: 0` (rule sits flush at bottom, section padding below provides gap)
- **Card internal padding**: 24px desktop → 16px mobile
- **Section header margin-bottom**: `3rem` — consistent across all sections

## Service Positioning & Pricing

### Brand Name

Always use **"Points Beyond AI"** — never "Points Beyond" alone on the site.

### Three Services

1. **AI Voice Agents** — lead offer (24/7 AI phone answering, lead capture)
2. **Reputation Management** — Google reviews generation + monitoring
3. **AEO + SEO** — structured content optimized for AI search (ChatGPT, Google AI Overview, Perplexity)

### Pricing (Single Source of Truth: `src/data/pricing.ts`)

All prices imported from `src/data/pricing.ts`. Never hardcode a number.

**Public "Starting at" language** anchors to real estate rates (simplest tier):
- AI Voice Agents: Setup $1,500 / **Starting at $349/mo**
- Reputation Management: Setup $750 / **Starting at $249/mo**
- AEO + SEO Foundation: $2,500 one-time / $599/mo optional retainer
- Bundle (all three): Setup $3,995 / **Starting at $797/mo**

Higher-complexity clients (HVAC, multi-location clinics) get custom quotes — not published.

**Early adopter offer** (first 5 clients): 40% off setup in exchange for case study + testimonial. Check with John before displaying this on the site.

### Target Vertical (April 2026)

Mid-tier Northern VA real estate agents. Cold outreach via personalized Loom + SMS + AI demo call.

### CRM

- Current: Systeme.io (free tier, email automation)
- Target: GHL ($97/mo) after first paying client

## CRM / Form Endpoint Swap Procedure

All form submissions go through the endpoint configured in `src/data/config.ts` → `formConfig.endpoint`.

**To swap from Formspree to GHL webhook:**
1. Open `src/data/config.ts`
2. Replace `formConfig.endpoint` with your GHL webhook URL (found in GHL → Automations → Webhook Trigger → copy URL)
3. If GHL expects JSON instead of FormData, update the `fetch` call in `ContactForm.astro` to add `Content-Type: application/json` and `JSON.stringify(formData)`
4. Test with a real submission before going live

**To swap to Systeme.io webhook:**
1. Get the webhook URL from Systeme.io → Automations → Webhook trigger
2. Same steps as GHL above — Systeme.io accepts FormData POST

**To swap to other providers (Zapier, Make, n8n):**
- Replace `formConfig.endpoint` with the Zapier/Make webhook URL
- No other changes needed for standard FormData submissions

## Third-Party Embed Slots

### Calendar (booking)

Placeholder div in `/src/pages/contact.astro`:
```html
<!-- Replace this div with your booking calendar embed code -->
<div class="calendar-embed-slot">...</div>
```
Supported: GHL calendar, Calendly, Cal.com, Acuity, TidyCal, etc.
Enable/configure in `src/data/config.ts` → `calendarConfig`.

### Chat Widget

Placeholder comment near closing `</body>` in `Layout.astro`:
```html
<!-- CHAT WIDGET SLOT: paste your chat embed script here -->
```
Supported: GHL chat widget, Intercom, Crisp, Tidio, etc.

## Architecture

```
src/
├── layouts/
│   └── Layout.astro        # Single layout. All CSS :root vars live here.
├── components/
│   ├── Header.astro
│   ├── Footer.astro         # DARK background
│   ├── Hero.astro           # LIGHT
│   ├── PainPoints.astro     # LIGHT
│   ├── Services.astro       # LIGHT
│   ├── Process.astro        # DARK — the dramatic mid-page moment
│   ├── Testimonials.astro   # LIGHT
│   ├── FAQ.astro            # LIGHT
│   └── ContactForm.astro    # LIGHT, Formspree-ready
├── pages/
│   ├── index.astro
│   ├── contact.astro        # Calendar slot + ContactForm
│   ├── privacy.astro
│   ├── terms.astro
│   └── services/
│       ├── voice-ai.astro
│       ├── reputation.astro
│       └── aeo-seo.astro
└── data/
    ├── pricing.ts           # All prices — single source of truth
    └── config.ts            # Site config, form endpoint, calendar config
```

## Deployment

Push to `main` → GitHub Actions builds Astro → deploys to GitHub Pages.

**Workflow file**: `.github/workflows/deploy.yml`

**To cut over to this repo (when ready):**
1. Enable GitHub Pages on `pb-jwhitlock/pointsbeyond-site` (Settings → Pages → Source: GitHub Actions)
2. Set custom domain to `pointsbeyond.ai`
3. Verify DNS propagation
4. Disable Pages on `pb-jwhitlock/points-beyond-frontend-1`
5. Archive (do not delete): `points-beyond-frontend-1`, `points-beyond` (old Astro rebuild)

## Current Status (April 27, 2026)

| Item | Status |
|---|---|
| Astro 6 project scaffolded | ✅ |
| Layout, Header, Footer | ✅ |
| All 7 homepage components | ✅ |
| Supporting pages (contact, privacy, terms, 3× service) | ✅ |
| Schema: FAQPage, ProfessionalService, LocalBusiness, Service | ✅ |
| Sitemap + robots.txt | ✅ |
| Contact form → GHL webhook (JSON fetch) | ✅ |
| GitHub repo `pb-jwhitlock/pointsbeyond-site` created | ✅ |
| GitHub Actions deploy workflow | ✅ — triggers on push to main |
| GitHub Pages enabled on new repo | ✅ |
| `pointsbeyond.ai` live on new Astro site | ✅ — HTTPS enforced |
| Old repos archived | ✅ — `points-beyond-frontend-1`, `points-beyond` archived; Pages disabled |
| Calendar embed (contact page) | ❌ — placeholder in place, add when ready |
| Favicon | ⚠️ — logo files copied but not rendering in browser; revisit post-launch |
| Terms page attorney review | ⚠️ — draft content, needs attorney sign-off |

**Live site**: https://pointsbeyond.ai — Astro 6 rebuild, fully deployed.

## Last Session Summary (April 27, 2026)

- Built entire `pointsbeyond-site` from scratch: Astro 6 project, all homepage sections (Hero → ContactForm), all supporting pages, full schema/SEO, sitemap, GitHub Actions workflow
- Switched contact form from Formspree to GHL webhook (`formConfig.endpoint` in config.ts) using fetch-based JSON submission with inline success/error states
- Completed full cutover: GitHub Pages enabled, custom domain `pointsbeyond.ai` set, HTTPS enforced, old repos (`points-beyond-frontend-1`, `points-beyond`) archived and Pages disabled

## Next Steps

**Soon:**
- Add calendar embed to `/contact/` (GHL calendar, Calendly, etc. — slot is ready in contact.astro)
- Add chat widget embed to `Layout.astro` (slot is ready near `</body>`)
- Expand service pages from placeholder to full copy (`/services/voice-ai/`, `/services/reputation/`, `/services/aeo-seo/`)
- Resolve favicon (Points Beyond dark mark — files in `public/` but browser not picking up)
- Terms page attorney sign-off before treating as final

## Known Issues / Notes

- `astro.config.mjs` uses `base: '/'` for the apex domain — do not change to a subpath
- Service pages (`/services/*`) are placeholder pages — crawlable with real schema, full copy TK
- SMS consent checkbox includes TCPA-compliant language in `ContactForm.astro`
- `siteConfig.email` in `config.ts` is `info@pointsbeyond.ai` — used in privacy + terms pages
- Terms page is a working draft — reviewed for [REVIEW] markers this session, needs attorney sign-off before cutover
- Favicon files in `public/`: `favicon-logo.jpg` (original), `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` — browser not rendering; revisit post-launch
