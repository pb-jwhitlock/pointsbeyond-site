export const siteConfig = {
  name: "Points Beyond AI",
  url: "https://pointsbeyond.ai",
  description: "AI services for small business: Voice AI Agents, Reputation Management, AEO/SEO",
  founder: "John Whitlock",
  email: "john@pointsbeyond.ai",
  location: "Fairfax, Virginia",
  social: {
    linkedin: "https://linkedin.com/company/points-beyond-ai",
  },
} as const;

export const formConfig = {
  endpoint: "https://services.leadconnectorhq.com/hooks/kCwBYibHdMHe4b5OQqHh/webhook-trigger/c01a8798-360d-456e-b466-22864d404c9c",
  method: "POST" as const,
} as const;
