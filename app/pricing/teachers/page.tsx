"use client";

import { PricingSection } from "@/components/pricing-section";

const teacherPlans = [
  {
    name: "Starter",
    price: { monthly: 29, annual: 24 },
    description: "Perfect for individual teachers",
    features: [
      "Up to 100 students",
      "Basic analytics",
      "5GB storage",
      "Email support",
      "Basic course creation tools",
      "Student progress tracking",
      "Mobile app access",
    ],
  },
  {
    name: "Professional",
    price: { monthly: 79, annual: 69 },
    description: "For professional educators",
    features: [
      "Up to 500 students",
      "Advanced analytics",
      "50GB storage",
      "Priority support",
      "Advanced course tools",
      "Custom branding",
      "Live sessions",
      "Assessment tools",
      "API access",
    ],
    recommended: true,
  },
  {
    name: "Department",
    price: { monthly: 149, annual: 129 },
    description: "For teaching departments",
    features: [
      "Up to 1000 students",
      "Custom analytics",
      "100GB storage",
      "24/7 support",
      "Collaboration tools",
      "White-labeling",
      "Custom integrations",
      "Advanced security",
      "Team management",
    ],
  },
];

export default function TeacherPricing() {
  return <PricingSection plans={teacherPlans} />;
}