# Points Beyond AI Site - Current State

## Latest Status
- **Styling**: ✅ Fixed and deployed (Node 22 required for Astro)
- **Form Webhook**: Testing with latest URL
- **Last Deployment**: May 25, 2026 - Style fix complete

## Key Fixes Applied Today
1. Added missing `siteConfig` export to `src/data/config.ts`
2. Updated `package.json`: Node requirement from `>=22.12.0` to `>=18.0.0` (workflow compatibility)
3. Fixed GitHub Pages: Changed from `gh-pages` branch to `GitHub Actions` deployment source
4. Updated `.github/workflows/deploy.yml`: Changed `node-version: 18` to `node-version: 22` (Astro requirement)
5. Updated GHL webhook URL in `src/data/config.ts`

## Current Config
**File**: `src/data/config.ts`

```typescript
export const formConfig = {
  endpoint: "https://services.leadconnectorhq.com/hooks/kCwBYibHdMHe4b5OQqHh/webhook-trigger/a6ca810c-1da6-42ca-8cd6-705ba638348e",
  method: "POST" as const,
} as const;
```

## Known Issues
- GHL webhook URLs changing frequently (investigate affiliate/plan changes)
- Form submissions need to be tested against current webhook URL

## Next Steps
- Continue testing form submissions with current webhook
- Investigate why GHL is regenerating webhook URLs daily
- Consider using a stable webhook endpoint or creating a wrapper

## Build & Deploy
- Build: `npm run build` (requires Node 22+)
- Deploy: Push to `main` branch → GitHub Actions auto-deploys
- Live site: https://pointsbeyond.ai

---
Last updated: May 25, 2026
