export interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface EntityPricingData {
  entityType: "institution" | "student" | "teacher";
  pricingPlans: PricingPlan[];
  faqs: FAQ[];
}

// Student Pricing Data
export const studentPricingData: EntityPricingData = {
  entityType: "student",
  pricingPlans: [
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
      name: "Basic",
      price: { monthly: 5, annual: 4 },
      description: "For students needing more resources",
      features: [
        "Access to premium courses",
        "Enhanced progress tracking",
        "5GB storage",
        "Email support",
        "Basic analytics",
        "Study reminders",
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
        "Custom study plans",
      ],
      recommended: true,
    },
  ],
  faqs: [
    {
      question: "Can I switch between free and paid plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
    },
    {
      question: "Do you offer student discounts?",
      answer:
        "Yes, we offer special discounts for students with a valid .edu email address.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time and continue to have access until the end of your billing period.",
    },
  ],
};

// Teacher Pricing Data
export const teacherPricingData: EntityPricingData = {
  entityType: "teacher",
  pricingPlans: [
    {
      name: "Basic",
      price: { monthly: 5, annual: 4 },
      description: "For individual teachers starting out",
      features: [
        "Single user access",
        "Basic course creation tools",
        "5GB storage",
        "Email support",
        "Basic analytics",
        "Mobile app access",
      ],
    },
    {
      name: "Professional",
      price: { monthly: 15, annual: 12 },
      description: "For teachers needing advanced features",
      features: [
        "Single user access",
        "Advanced course creation tools",
        "50GB storage",
        "Priority email support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Integration with other educational tools",
      ],
      recommended: true,
    },
    {
      name: "Institution",
      price: { monthly: 29, annual: 24 },
      description: "For educational institutions with multiple teachers",
      features: [
        "Up to 50 user accounts",
        "Advanced course creation tools",
        "200GB storage",
        "Priority email and chat support",
        "Advanced analytics and reporting",
        "Custom branding and domain",
        "API access with higher limits",
        "Advanced integrations",
        "Dedicated account manager",
        "Custom feature development",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.",
    },
    {
      question: "Do you offer discounts for educational institutions?",
      answer:
        "Yes, we offer special pricing for educational institutions. Please contact our sales team for more information.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for new users. No credit card is required to start the trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
    },
    {
      question: "How does the billing cycle work?",
      answer:
        "Billing is recurring on the day you signed up. For monthly plans, you are billed every month, and for annual plans, you are billed once per year.",
    },
  ],
};

// Institution Pricing Data
export const institutionPricingData: EntityPricingData = {
  entityType: "institution",
  pricingPlans: [
    {
      name: "Basic",
      price: { monthly: 29, annual: 24 },
      description: "Perfect for small educational institutions",
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
      price: { monthly: 79, annual: 69 },
      description: "Ideal for growing educational institutions",
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
      name: "Pro Plus",
      price: {
        monthly: 129,
        annual: 109,
      },
      description:
        "Best for large educational institutions needing extensive features",
      features: [
        "Up to 10,000 students",
        "Premium analytics and reporting",
        "200GB storage",
        "24/7 Priority email, chat, and phone support",
        "Advanced course creation tools with AI assistance",
        "Custom branding and domain",
        "Advanced API access with higher rate limits",
        "Enterprise-level integrations",
        "Unlimited admin accounts",
        "Advanced automated workflows and custom automation",
      ],
      recommended: false,
    },
  ],
  faqs: [
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
      question: "What happens when I exceed my student limit?",
      answer:
        "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or contact us for a custom solution.",
    },
  ],
};

// Helper function to get pricing data by entity type
export function getPricingAndFaqData(
  entityType: "institution" | "student" | "teacher"
): EntityPricingData {
  switch (entityType) {
    case "student":
      return studentPricingData;
    case "institution":
      return institutionPricingData;
    case "teacher":
      return teacherPricingData;
    default:
      throw new Error(`Unsupported entity type: ${entityType}`);
  }
}
