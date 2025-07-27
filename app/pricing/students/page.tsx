"use client";

import { PricingSection } from "@/components/pricing-section";
import { getPricingAndFaqData } from "../data/pricingAndFaqData";

export default function StudentPricing() {
  const { pricingPlans: studentPlans, faqs: studentFaqs } =
    getPricingAndFaqData("student");
  return <PricingSection plans={studentPlans} />;
}
