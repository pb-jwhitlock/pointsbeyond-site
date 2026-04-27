// Site configuration — single source of truth for endpoints and metadata

export const siteConfig = {
  name: "Points Beyond AI",
  url: "https://pointsbeyond.ai",
  description:
    "Points Beyond AI helps small businesses capture every lead with AI voice agents, reputation management, and AI search optimization. Based in Fairfax County, VA.",
  founder: "John Whitlock",
  location: {
    city: "Fairfax County",
    state: "VA",
    country: "US",
  },
  email: "info@pointsbeyond.ai",
  social: {
    linkedin: "https://www.linkedin.com/in/johnhwhitlock/",
  },
} as const;

// ---------------------------------------------------------------------------
// Form / CRM endpoint configuration
//
// HOW TO SWAP CRM ENDPOINTS:
// 1. Replace FORM_ENDPOINT below with your new webhook URL.
// 2. If the new endpoint expects different field names, update ContactForm.astro.
// 3. Formspree:      https://formspree.io/f/YOUR_FORM_ID
//    GHL webhook:    https://services.leadconnectorhq.com/hooks/YOUR_HOOK_ID/webhook-trigger/...
//    Systeme.io:     https://systeme.io/webhook/...
// 4. For GHL specifically, set method to "POST" and include the
//    "Content-Type: application/json" header in the form's fetch call.
// ---------------------------------------------------------------------------
export const formConfig = {
  // Replace with your Formspree form ID after signing up at formspree.io
  endpoint: "https://formspree.io/f/xnjlyknn",
  method: "POST" as const,
} as const;

// Calendar embed — swap the placeholder div in /contact/ with your embed code
// Supported: GHL calendar, Calendly, Cal.com, Acuity, etc.
// See /src/pages/contact.astro for the slot with the HTML comment.
export const calendarConfig = {
  // Set to true and add embedCode when you have a calendar to embed
  enabled: false,
  embedCode: "",
} as const;
