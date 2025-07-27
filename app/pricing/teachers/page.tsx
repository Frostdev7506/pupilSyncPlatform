"use client";

import { PricingSection } from "@/components/pricing-section";
import { getPricingAndFaqData } from "../data/pricingAndFaqData";

export default function TeacherPricing() {
  const { pricingPlans: teacherPlans, faqs: teacherFaqs } =
    getPricingAndFaqData("teacher");
  return <PricingSection plans={teacherPlans} />;
}
