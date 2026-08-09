export const siteConfig = {
  name: "Points Beyond AI",
  url: "https://pointsbeyond.ai",
  description: "Points Beyond AI builds autonomous AI agents that answer every call, generate reviews, and get your business cited by ChatGPT and Perplexity. Fairfax County, VA.",
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
