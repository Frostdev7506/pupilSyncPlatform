"use client";

import { PricingSection } from "@/components/pricing-section";

import { getPricingAndFaqData } from "../data/pricingAndFaqData";

export default function OrganizationPricing() {
  const { pricingPlans: organizationPlans, faqs: organizationFaqs } =
    getPricingAndFaqData("institution");
  return <PricingSection plans={organizationPlans} />;
}
