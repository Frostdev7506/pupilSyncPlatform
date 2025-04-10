"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Add these imports at the top
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  recommended?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
}

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. The price difference will be prorated.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial for all plans. No credit card required.",
  },
  {
    question: "What happens when I exceed my student limit?",
    answer:
      "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or contact us for a custom solution.",
  },
  {
    question: "Do you offer discounts for educational institutions?",
    answer:
      "Yes, we offer special pricing for educational institutions. Please contact our sales team for more information.",
  },
];

export function PricingSection({ plans }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Set initial width
      handleResize();

      // Add resize listener
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <Label
            htmlFor="billing-toggle"
            className={cn(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-primary" : "text-muted-foreground"
            )}
          >
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label
            htmlFor="billing-toggle"
            className={cn(
              "text-sm font-medium transition-colors",
              isAnnual ? "text-primary" : "text-muted-foreground"
            )}
          >
            Annually{" "}
            <span className="text-xs text-primary ml-1 bg-primary/10 px-2 py-0.5 rounded-full mt-20">
              Save 20%
            </span>
          </Label>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={cn("relative h-full")}
            >
              <Card
                className={cn(
                  "relative h-full flex flex-col transition-all duration-300",
                  plan.recommended
                    ? [
                        "border-2 border-primary",
                        "shadow-[0_4px_25px_0px_rgba(0,0,0,0.1)]",
                        "hover:shadow-[0_4px_35px_0px_rgba(0,0,0,0.2)]",
                        "bg-gradient-to-b from-background to-primary/5",
                      ]
                    : [
                        "border border-border/50",
                        "hover:border-border",
                        "hover:shadow-lg",
                      ]
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader
                  className={cn("space-y-2", plan.recommended && "pb-8")}
                >
                  <CardTitle className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xl font-semibold">{plan.name}</span>
                      {plan.recommended && (
                        <span className="block text-sm text-primary mt-1">
                          Best value for most users
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                        <span className="text-sm text-muted-foreground">
                          /mo
                        </span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-muted-foreground">
                          billed ${plan.price.annual * 12} annually
                        </div>
                      )}
                    </div>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 mt-0.5 flex-shrink-0",
                            plan.recommended
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    className="w-full"
                    style={{ textWrap: "wrap", padding: "0.5%" }}
                    size="lg"
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    Get started with {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-col">
        {/* FAQs */}
        <motion.div
          variants={itemVariants}
          className="w-[90%] md:w-[80%] mx-auto"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            {" "}
            {/* Fixed typo: 2x1 → 2xl */}
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    {/* Added responsive sizing and flex-shrink */}
                    <HelpCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-muted-foreground" />
                    <span className="text-sm md:text-base">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base">
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
            Contact our team for a custom quote or to learn more about our
            enterprise solutions.
          </p>
          <Button size="lg">Contact Sales</Button>
        </motion.div>
      </div>
    </>
  );
}
