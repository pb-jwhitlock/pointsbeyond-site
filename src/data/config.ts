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
  endpoint: "https://services.leadconnectorhq.com/hooks/kCwBYibHdMHe4b5OQqHh/webhook-trigger/a6ca810c-1da6-42ca-8cd6-705ba638348e",
  method: "POST" as const,
} as const;
