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
  CheckSquare,    // For Acceptance
  UserCheck,      // For User Responsibilities
  Ban,            // For Prohibited Activities
  Copyright,      // For Intellectual Property
  AlertTriangle,  // For Limitation of Liability
  FileEdit,       // For Changes to Terms
  ArrowLeft,
} from "lucide-react";

export default function TermsPage() {
  const termsSections = [
    {
      id: "item-1",
      title: "1. Acceptance of Terms",
      icon: <CheckSquare className="h-5 w-5 text-green-600" />,
      content:
        "By accessing, browsing, or using the services, websites, or applications (collectively, 'Services') provided by [Your Company Name], you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ('Terms') and our Privacy Policy. If you do not agree, you may not use the Services.",
    },
    {
      id: "item-2",
      title: "2. User Account and Responsibilities",
      icon: <UserCheck className="h-5 w-5 text-blue-600" />,
      content:
        "You may need to register for an account to access certain features. You agree to provide accurate information and keep it updated. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.",
    },
    {
      id: "item-3",
      title: "3. Prohibited Conduct",
      icon: <Ban className="h-5 w-5 text-red-600" />,
      content:
        "You agree not to use the Services for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Service. Prohibited activities include, but are not limited to: attempting unauthorized access, distributing malware, harassing others, infringing intellectual property, or scraping data without permission.",
    },
    {
      id: "item-4",
      title: "4. Intellectual Property Rights",
      icon: <Copyright className="h-5 w-5 text-purple-600" />,
      content:
        "All content, features, and functionality within the Services, including text, graphics, logos, icons, images, and software, are the exclusive property of [Your Company Name] or its licensors and are protected by international copyright, trademark, and other intellectual property laws. You are granted a limited license only for purposes of using the Services.",
    },
    {
      id: "item-5",
      title: "5. Disclaimers and Limitation of Liability",
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      content:
        "The Services are provided 'as is' and 'as available' without warranties of any kind. To the fullest extent permitted by law, [Your Company Name] disclaims all warranties. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services.",
    },
    {
      id: "item-6",
      title: "6. Modification of Terms",
      icon: <FileEdit className="h-5 w-5 text-indigo-600" />,
      content:
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide reasonable notice prior to any new terms taking effect (e.g., via email or a notice on the Service). Continued use of the Services after changes constitutes acceptance.",
    },
    // Add more sections as needed (e.g., Governing Law, Termination, Contact Info)
  ];

  // Get current date for "Effective Date"
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    // Consistent background and padding
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Consistent Card styling */}
        <Card className="w-full shadow-md border border-border/50 rounded-lg bg-card text-card-foreground overflow-hidden">
          <CardHeader className="bg-muted/30 p-6 border-b border-border/50">
            <CardTitle className="text-center text-3xl font-bold tracking-tight">
              {/* Consistent Title gradient */}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground pt-2">
              Effective Date: {effectiveDate}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {/* Consistent Accordion styling */}
            <Accordion type="single" collapsible className="w-full space-y-1">
              {termsSections.map((section, index) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  // Consistent border styling
                  className={`border-b ${index === termsSections.length - 1 ? 'border-b-0' : 'border-border/50'}`}
                >
                  <AccordionTrigger className="text-base sm:text-lg font-medium hover:no-underline py-4 px-2 text-left hover:bg-muted/50 rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      {/* Clone icon to apply consistent classes */}
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
            {/* Consistent Button styling and placement */}
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