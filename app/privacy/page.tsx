"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Database,
  Users,
  Cookie,
  FileText, // Changed icon for Policy Changes
  Scale,
  ArrowLeft,
  Info, // Keep Info icon for first item
  Server // Added Server icon for third-party
} from "lucide-react";

export default function PrivacyPage() {
  const policySections = [
    {
      id: "item-1",
      title: "Information We Collect",
      icon: <Info className="h-5 w-5 text-blue-500" />,
      content:
        "We collect information you provide directly, such as when you create an account (name, email). We also gather technical data automatically, like your IP address, device type, browser information, and interaction patterns with our service (usage data), primarily to ensure functionality and improve our offerings.",
    },
    {
      id: "item-2",
      title: "How We Use Your Information",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      content:
        "Your data is used to operate, maintain, and enhance our platform. This includes providing core services, personalizing content, processing necessary transactions, sending essential communications (updates, security alerts, support messages), analyzing usage for improvements, and preventing fraud or abuse.",
    },
    {
      id: "item-3",
      title: "Data Security Measures",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      content:
        "We employ robust security practices, including data encryption (in transit and at rest where appropriate), access controls, and regular security audits, to safeguard your personal information. However, no system is impenetrable, and we cannot guarantee absolute security.",
    },
    {
      id: "item-4",
      title: "Third-Party Service Providers",
      icon: <Server className="h-5 w-5 text-orange-500" />, // Changed Icon
      content:
        "We may engage third-party companies (e.g., cloud hosting, analytics tools, payment gateways) to perform specific functions. These providers have access only to the information necessary for their tasks and are obligated to protect it. We recommend reviewing their respective privacy policies.",
    },
    {
      id: "item-5",
      title: "Cookies and Tracking",
      icon: <Cookie className="h-5 w-5 text-yellow-600" />, // Slightly darker yellow
      content:
        "Our website uses cookies and similar technologies (like pixels or local storage) to improve user experience, remember preferences, analyze traffic patterns, and support security features. You have control over cookie settings via your browser.",
    },
    {
      id: "item-6",
      title: "Your Data Rights & Choices",
      icon: <Scale className="h-5 w-5 text-indigo-500" />,
      content:
        "You generally have the right to access, review, modify, or delete your personal information stored by us. You can often manage basic account details directly. For other requests or questions about your data, please contact us via the provided channels.",
    },
    {
      id: "item-7",
      title: "Policy Updates",
      icon: <FileText className="h-5 w-5 text-red-500" />, // Changed Icon
      content:
        "This Privacy Policy may be updated from time to time to reflect changes in our practices or legal requirements. We will notify you of significant revisions, typically by posting the updated policy prominently on our website along with the effective date.",
    },
  ];

  // Get current date for "Last Updated"
  const lastUpdatedDate = new Date().toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    // Use a subtle background pattern or cleaner gradient
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Use standard Card component with better spacing and optional border */}
        <Card className="w-full shadow-md border border-border/50 rounded-lg bg-card text-card-foreground overflow-hidden">
          <CardHeader className="bg-muted/30 p-6 border-b border-border/50">
            {/* Optional: Add an icon to the header */}
            {/* <FileText className="h-8 w-8 mb-4 text-primary mx-auto" /> */}
            <CardTitle className="text-center text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground pt-2">
              Effective Date: {lastUpdatedDate}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {/* Refined Accordion styling */}
            <Accordion type="single" collapsible className="w-full space-y-1">
              {policySections.map((section, index) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  // Remove individual borders, add bottom border only for separation
                  className={`border-b ${index === policySections.length - 1 ? 'border-b-0' : 'border-border/50'}`}
                >
                  <AccordionTrigger className="text-base sm:text-lg font-medium hover:no-underline py-4 px-2 text-left hover:bg-muted/50 rounded-md transition-colors">
                    <div className="flex items-center gap-3"> {/* Use gap for spacing */}
                      {React.cloneElement(section.icon, { className: "h-5 w-5 shrink-0" })}
                      <span>{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4 px-2 text-base text-muted-foreground leading-relaxed">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>

          <CardFooter className="bg-muted/30 p-6 border-t border-border/50 flex justify-start">
            <Button asChild variant="outline" size="sm" className="group">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}