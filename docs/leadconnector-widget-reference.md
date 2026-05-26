# LeadConnector Chat Widget — Testing Checklist & Performance Reference

## Testing Checklist

### Widget Load Verification

- [ ] Open https://pointsbeyond.ai in a fresh incognito window
- [ ] Confirm chat bubble appears in bottom-right corner within 3 seconds
- [ ] Open each page in sequence: `/`, `/contact`, `/services/voice-ai/`, `/services/reputation/`, `/services/aeo-seo/`, `/privacy`, `/terms`
- [ ] Confirm widget appears on every page (it loads from `Layout.astro`, so it should)
- [ ] Hard-refresh (Cmd+Shift+R) on homepage — widget should still appear

### Mobile Responsiveness

- [ ] Test at 375px (iPhone SE): widget bubble should not overlap main CTAs
- [ ] Test at 414px (iPhone Pro): bubble position correct
- [ ] Test at 768px (tablet): bubble position correct
- [ ] Open widget on mobile — chat panel should be full-screen or near-full-screen, not a tiny popup
- [ ] Test chat input on mobile: keyboard opens without breaking layout

### Console Error Check

1. Open DevTools → Console
2. Filter for errors (red) only
3. Load the page
- [ ] No `net::ERR_*` errors for the widget script URLs
- [ ] No `Content Security Policy` errors blocking `widgets.leadconnectorhq.com`
- [ ] No uncaught JS exceptions related to `lcWidget` or `leadconnector`

### Schema Markup Validation

- [ ] Go to https://validator.schema.org/ → Fetch URL → enter `https://pointsbeyond.ai`
- [ ] Confirm `ProfessionalService` entity appears with `contactPoint` array
- [ ] Confirm `CommunicateAction` appears under `potentialAction`
- [ ] Confirm `WebSite` entity with `speakable` property appears
- [ ] No critical errors (warnings about `contactOption: TollFree` without a phone number are acceptable — add a phone number to `siteConfig` when available)
- [ ] Run Google Rich Results Test on the homepage URL

### Core Web Vitals Impact Check

- [ ] Run PageSpeed Insights before widget deployment (baseline): https://pagespeed.web.dev/
- [ ] Record: LCP, TBT (proxy for FID/INP), CLS scores
- [ ] Deploy widget, wait 24 hours for data to collect in CrUX
- [ ] Re-run PageSpeed — confirm LCP has not degraded by more than 0.2s
- [ ] Confirm CLS is unchanged (widget should not cause layout shift on load)
- [ ] Run WebPageTest with widget active: confirm widget script does not appear on critical path

### Functional Test

- [ ] Click chat bubble — widget opens
- [ ] Type a message — message sends successfully
- [ ] Close widget — bubble returns
- [ ] Re-open widget — prior conversation persists (if configured in GHL)
- [ ] Submit lead capture form inside widget (if enabled) — confirm lead appears in GHL CRM

---

## Performance Optimization Reference

### Current Implementation

The widget script uses `async` loading:

```html
<script
  src="https://widgets.leadconnectorhq.com/loader.js"
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
  data-widget-id="6a15b9c11ce15bb9e91d3f65"
  async
></script>
```

`async` means: the script downloads in parallel with HTML parsing and executes as soon as it's ready, without blocking the parser. This is the correct choice for a non-critical UI enhancement.

### Core Web Vitals Considerations

**LCP (Largest Contentful Paint)**
- Risk: low. The widget loads after the main document and is not the LCP element.
- Watch for: widget injecting large images or fonts that delay LCP indirectly.
- Mitigation: already handled by `async` attribute.

**INP (Interaction to Next Paint)**
- Risk: medium. Widget JavaScript runs on the main thread and can increase long tasks.
- Mitigation: GHL loads widget code from their CDN in chunks. If INP degrades, consider lazy-loading (see below).

**CLS (Cumulative Layout Shift)**
- Risk: low-medium. If the widget injects a button that shifts other content.
- Watch for: chat bubble appearing and pushing footer content.
- Mitigation: GHL positions the bubble with `position: fixed`, so it should not shift content. Verify on mobile at 375px.

### Lazy Loading Option

If Core Web Vitals degrade, replace the `async` script with an interaction-triggered load:

```html
<script>
  (function () {
    var loaded = false;
    function loadWidget() {
      if (loaded) return;
      loaded = true;
      var s = document.createElement('script');
      s.src = 'https://widgets.leadconnectorhq.com/loader.js';
      s.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      s.setAttribute('data-widget-id', '6a15b9c11ce15bb9e91d3f65');
      s.async = true;
      document.body.appendChild(s);
    }
    // Load on first user interaction or after 5s idle, whichever comes first
    ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(function (e) {
      window.addEventListener(e, loadWidget, { once: true, passive: true });
    });
    setTimeout(loadWidget, 5000);
  })();
</script>
```

Trade-off: widget appears ~500ms later on first interaction, but main thread is fully free during initial page load. Use this only if PageSpeed shows TBT regression.

### Resource Hints (Optional)

Add to `Layout.astro` `<head>` to warm the connection early:

```html
<link rel="preconnect" href="https://widgets.leadconnectorhq.com" />
<link rel="dns-prefetch" href="https://widgets.leadconnectorhq.com" />
```

This saves ~100–200ms DNS + TLS handshake without fetching the script early.

### Monitoring Recommendations

- **CrUX data**: GA4 → Reports → Core Web Vitals (data available after ~28 days of traffic)
- **Synthetic**: Run PageSpeed Insights weekly; set a Slack/email reminder
- **Real-user**: Consider installing the Web Vitals Chrome extension during manual QA
- **GHL widget health**: GHL dashboard → Chat Widgets → check for error rates or offline status
