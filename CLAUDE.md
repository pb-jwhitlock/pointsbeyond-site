# Points Beyond AI Site

> When this doc describes current state, verify it against the live code/git log before relying on it — don't assume it's current.

## Conventions

### Build & Deploy
- Build: `npm run build` (Astro itself requires Node **>=22.12.0**; `package.json` engines is set to `>=18.0.0` for workflow-compat reasons — see History — but a local build on Node <22 will still fail)
- Deploy: push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages → `purge-cache` job auto-purges Cloudflare after `deploy` completes (zone ID/secret name in that file). No manual purging needed.
- Live site: https://pointsbeyond.ai (custom domain via `CNAME`, Cloudflare-proxied)

### Astro CSS Scoping — Important
- Component `<style>` blocks are scoped to that component only
- Class names defined in one component (e.g. `.faq-inner` in `FAQ.astro`) do NOT apply when reused in page files
- Solution: use inline styles or global CSS for cross-component layout

### Chat Widget
- Config (widget ID, loader script, placement) lives in `Layout.astro` — read it directly
- Reference docs: `docs/leadconnector-ga4-tracking.md`, `docs/leadconnector-widget-reference.md`

### Skills Library
- Repo: https://github.com/pb-jwhitlock/claude-skills
- To load a skill, share the raw URL or paste the SKILL.md content at the start of the session

---

## Current State
_Last verified: 2026-08-26_

- **Forms**: No live `<form>` exists anywhere in this repo. `formConfig.endpoint` in `src/data/config.ts` is unused/dead code (a leftover GHL webhook URL). `/contact/` embeds a third-party Agency Vault booking-calendar iframe; the homepage "Get Started" section is a link to `/contact/`, not a form.
- **SMS opt-in / A2P**: LeadConnector chat widget (widget ID `6a15b9c11ce15bb9e91d3f65`) is the sole SMS opt-in. It loads **sitewide** via `Layout.astro`, not `/contact/`-only.
- **Schema markup**: `contactPoint`, `CommunicateAction`, `WebSite/SpeakableSpecification` are present in `orgSchema` (`Layout.astro`). `SpeakableSpecification.cssSelector` is `["h1", "h2", ".service-name", ".hero-sub"]` — all four selectors exist and resolve to real content (verified against the built `dist/` output 2026-08-26).
- **Favicon / logo**: Points Beyond logo deployed as favicon (ICO + 16/32/180/192/512px) in `public/`; `Header.astro` and `Footer.astro` both use `/favicon-180.png` for the nav/footer mark.
- **GA4**: not yet added — no `gtag`/GA references anywhere in `src/`.
- **Service pages** (`/services/voice-ai/`, `/reputation/`, `/aeo-seo/`): appear fully built out (schema + pricing + copy) as of the Aug 9 rebrand commits — confirm with John whether "expand from placeholder" is still open.
- **Cloudflare auto-purge**: live, wired to every deploy.

### Open / pending
- Port the Cloudflare auto-purge workflow to the lemair-tennis repo (confirmed not present there as of this audit)
- Terms page attorney sign-off (not code-verifiable — tracked here on John's say-so)
- ~~Fix the `.hero-tagline` selector bug~~ — **fixed 2026-08-26**, see History
- Turnstile bot protection: investigated 2026-08-26, not built (see History)

---

## History & Decisions

- **2026-06-23** (`39e09fb`): `ContactForm.astro` deleted from homepage and `/contact/` for the A2P SMS audit — SMS opt-in consolidated to the chat widget. Deleted, not just unused. **Don't restore without re-deciding the phone/SMS-field question that triggered its removal.**
- **2026-06-24** (`950e8e9`): Booking calendar iframe added to `/contact/` — this closed out the "add calendar embed" next-step from the prior session.
- **~2026-05-25**: `package.json` engines widened from `>=22.12.0` to `>=18.0.0` for CI/workflow compatibility, even though Astro 6 itself still requires Node `>=22.12.0`. The GH Actions workflow pins `node-version: 22` so this hasn't bitten in CI, but it means the engines field is aspirational, not enforced.
- **~2026-05-25**: GitHub Pages deploy source switched from the `gh-pages` branch to native GitHub Actions deployment.
- GHL webhook URL churned repeatedly in `src/data/config.ts` historically; last change was 2026-05-25. Now moot day-to-day since nothing in `src/` calls `formConfig.endpoint`.
- **2026-08-26**: Fixed the `SpeakableSpecification` selector bug — `Layout.astro`'s `orgSchema` listed `.hero-tagline`, which didn't exist anywhere in `src/`. Replaced with `.hero-sub` (`Hero.astro`'s descriptive summary paragraph), chosen over `.hero-headline` (redundant with the already-listed `"h1"`, since that class sits on the `<h1>` itself) and `.hero-eyebrow` (too terse to serve as a speakable summary). Verified by building the site and `JSON.parse`-ing the rendered JSON-LD out of `dist/index.html` — parses cleanly, selector list is `["h1", "h2", ".service-name", ".hero-sub"]`, and `.hero-sub` resolves to real content in the build output.
- **2026-08-26**: Investigated adding Cloudflare Turnstile bot protection (same pattern as davidlemairtennis.com). Found no `<form>` exists to attach it to — withdrawn rather than restoring `ContactForm.astro` speculatively. If revisited: decide restore-vs-alternative first (see Current State); the davidlemairtennis.com Worker-relay pattern (Worker calls `siteverify`, then forwards) is still the right template given this site has no backend of its own.

---
Last updated: 2026-08-26
