"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, HelpCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const pricingPlans = [
  {
    name: "Basic",
    price: {
      monthly: 29,
      annual: 24,
    },
    description: "Perfect for individuals and small teams",
    features: [
      "Up to 100 students",
      "Basic analytics",
      "5GB storage",
      "Email support",
      "Basic course creation tools",
      "Student progress tracking",
      "Mobile app access",
      "Basic integrations",
    ],
  },
  {
    name: "Pro",
    price: {
      monthly: 79,
      annual: 69,
    },
    description: "Ideal for growing organizations",
    features: [
      "Up to 1,000 students",
      "Advanced analytics",
      "50GB storage",
      "Priority email & chat support",
      "Advanced course creation tools",
      "Custom branding",
      "API access",
      "Advanced integrations",
      "Multiple admin accounts",
      "Automated workflows",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: {
      monthly: 199,
      annual: 179,
    },
    description: "For large institutions and corporations",
    features: [
      "Unlimited students",
      "Custom analytics",
      "Unlimited storage",
      "24/7 dedicated support",
      "Custom development",
      "White-labeling",
      "Custom integrations",
      "Single sign-on (SSO)",
      "Advanced security features",
      "Custom reporting",
      "SLA guarantee",
      "Onboarding manager",
    ],
  },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. The price difference will be prorated.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all plans. No credit card required.",
  },
  {
    question: "What happens when I exceed my student limit?",
    answer: "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or contact us for a custom solution.",
  },
  {
    question: "Do you offer discounts for educational institutions?",
    answer: "Yes, we offer special pricing for educational institutions. Please contact our sales team for more information.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <div className="min-h-screen bg-background py-20">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your needs
          </p>
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="billing-toggle" className={!isAnnual ? "text-primary" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className={isAnnual ? "text-primary" : "text-muted-foreground"}>
              Annually <span className="text-sm text-primary">Save 20%</span>
            </Label>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {pricingPlans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card className={`relative h-full ${plan.recommended ? 'border-primary shadow-lg' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.name}</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8">
            Contact our team for a custom quote or to learn more about our enterprise solutions.
          </p>
          <Button size="lg">Contact Sales</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}