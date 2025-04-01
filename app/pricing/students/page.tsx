"use client";

import { PricingSection } from "@/components/pricing-section";

const studentPlans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for individual students",
    features: [
      "Access to free courses",
      "Basic progress tracking",
      "1GB storage",
      "Community support",
      "Mobile app access",
    ],
  },
  {
    name: "Pro Student",
    price: { monthly: 9, annual: 7 },
    description: "For serious learners",
    features: [
      "Unlimited course access",
      "Advanced progress analytics",
      "10GB storage",
      "Priority support",
      "Offline access",
      "Certificate generation",
      "Study groups",
    ],
    recommended: true,
  },
  {
    name: "Student Plus",
    price: { monthly: 15, annual: 12 },
    description: "Complete learning experience",
    features: [
      "Everything in Pro Student",
      "1-on-1 tutoring sessions",
      "25GB storage",
      "24/7 support",
      "Career guidance",
      "Industry certifications",
      "Job placement assistance",
    ],
  },
];

export default function StudentPricing() {
  return <PricingSection plans={studentPlans} />;
}