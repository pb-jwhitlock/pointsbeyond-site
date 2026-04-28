// Single source of truth for all pricing — import from here, never hardcode

export const pricing = {
  voiceAI: {
    name: "AI Voice Agents",
    setup: 1500,
    monthly: 349,
    monthlyLabel: "Starting at $349/mo",
    setupLabel: "$1,500 setup",
    description: "24/7 AI-powered phone answering that captures every lead.",
    roiAnchor: "Never miss an emergency call — your AI answers, triages, and routes urgent leads before they call your competitor.",
  },
  reputation: {
    name: "Reputation Management",
    setup: 750,
    monthly: 249,
    monthlyLabel: "Starting at $249/mo",
    setupLabel: "$750 setup",
    description: "Systematic Google review generation and monitoring.",
    roiAnchor: "One new 5-star review can be worth thousands in referrals",
  },
  aeoSeo: {
    name: "AEO Foundation",
    oneTime: 2500,
    oneTimeLabel: "$2,500",
    monthly: 599,
    monthlyLabel: "$599/mo retainer (optional)",
    description: "Structured content optimized for AI search visibility.",
    roiAnchor: "AI search is where your next customer is looking — be there first",
  },
  bundle: {
    name: "Full Growth Bundle",
    setup: 3995,
    monthly: 797,
    monthlyLabel: "Starting at $797/mo",
    setupLabel: "$3,995 setup",
    description: "All three services. One team. Coordinated growth strategy.",
  },
} as const;

// Floor price used in "Starting at" headlines
export const floorMonthly = 349;
export const floorMonthlyLabel = "Starting at $349/mo";
