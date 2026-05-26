# LeadConnector Chat Widget — GA4 Tracking Setup

## Overview

LeadConnector fires JavaScript events when users interact with the chat widget. You can listen for these and push them to GA4 using `gtag()` or `dataLayer`.

---

## Step 1: Add GA4 to the Site

If GA4 is not yet installed, add this to `Layout.astro` inside `<head>`, replacing `G-XXXXXXXXXX` with your Measurement ID:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Step 2: Listen for Widget Events

Add this inline script **after** the LeadConnector widget script in `Layout.astro`:

```html
<script>
  (function () {
    function trackChatEvent(eventName, params) {
      if (typeof gtag !== 'function') return;
      gtag('event', eventName, { event_category: 'chat_widget', ...params });
    }

    // Widget opened
    window.addEventListener('lcWidgetOpen', function () {
      trackChatEvent('chat_open', { widget_id: '6a15b9c11ce15bb9e91d3f65' });
    });

    // Message sent by visitor
    window.addEventListener('lcMessageSent', function (e) {
      trackChatEvent('chat_message_sent', {
        widget_id: '6a15b9c11ce15bb9e91d3f65',
        message_count: e.detail?.messageCount ?? 1,
      });
    });

    // Lead capture form submitted inside widget
    window.addEventListener('lcLeadCaptured', function (e) {
      trackChatEvent('chat_lead_captured', {
        widget_id: '6a15b9c11ce15bb9e91d3f65',
        lead_source: 'chat_widget',
      });
      // Also fire GA4 recommended lead event
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { source: 'leadconnector_chat' });
      }
    });

    // Widget closed
    window.addEventListener('lcWidgetClose', function () {
      trackChatEvent('chat_close', { widget_id: '6a15b9c11ce15bb9e91d3f65' });
    });
  })();
</script>
```

> **Note:** LeadConnector event names (`lcWidgetOpen`, `lcMessageSent`, etc.) are based on common GHL widget patterns. Verify exact event names in your GHL dashboard → Chat Widget → Developer settings, or by watching `window` events in browser DevTools after the widget loads.

---

## Step 3: GA4 Events Reference

| GA4 Event Name | Trigger | Key Parameters |
|---|---|---|
| `chat_open` | Visitor opens widget | `widget_id`, `event_category` |
| `chat_message_sent` | Visitor sends a message | `widget_id`, `message_count` |
| `chat_lead_captured` | Lead form submitted | `widget_id`, `lead_source` |
| `generate_lead` | Lead form submitted | `source: leadconnector_chat` |
| `chat_close` | Widget closed | `widget_id` |

---

## Step 4: Verify in GA4 DebugView

1. Open GA4 → Admin → DebugView
2. Open pointsbeyond.ai in an incognito window
3. Interact with the chat widget
4. Confirm events appear in DebugView within ~30 seconds

---

## Step 5: Create GA4 Conversions

Mark `chat_lead_captured` and `generate_lead` as conversion events:

1. GA4 → Admin → Events
2. Find `chat_lead_captured` → toggle "Mark as conversion"
3. Repeat for `generate_lead`

---

## Funnel to Watch

**Chat open rate** = `chat_open` / total sessions  
**Engagement rate** = `chat_message_sent` / `chat_open`  
**Lead rate** = `chat_lead_captured` / `chat_open`

A healthy chat funnel: 3–8% open rate, 40–60% engagement, 10–20% lead capture.
