"use client";

import { PricingSection } from "@/components/pricing-section";


const organizationPlans = [
  {
    name: "Basic",
    price: { monthly: 299, annual: 249 },
    description: "For small institutions",
    features: [
      "Up to 1,000 users",
      "Basic analytics",
      "100GB storage",
      "Email & chat support",
      "LMS integration",
      "Basic admin tools",
      "Standard security",
    ],
  },
  {
    name: "Professional",
    price: { monthly: 799, annual: 699 },
    description: "For growing institutions",
    features: [
      "Up to 5,000 users",
      "Advanced analytics",
      "500GB storage",
      "Priority support",
      "Advanced admin tools",
      "Custom branding",
      "API access",
      "SSO integration",
      "Advanced security",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 1999, annual: 1799 },
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Custom analytics",
      "Unlimited storage",
      "24/7 dedicated support",
      "Custom development",
      "White-labeling",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
      "Onboarding manager",
    ],
  },
];

export default function OrganizationPricing() {
  return <PricingSection plans={organizationPlans} />;
}