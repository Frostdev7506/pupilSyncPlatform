"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Instagram,
  MessageCircle, // Using MessageCircle for WhatsApp for consistency
  ChevronRight,
  Building,
  Percent,
  ClipboardCheck,
  Headset,
} from "lucide-react";
import ProfileImage from "@/components/ProfileImage";

// --- Animation Variants (reusing from your example) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// --- Sales Representative Data ---
const salesRep = {
  name: "Neeraj Butola",
  title: "Senior Tech Lead  ",
  avatarUrl: "/images/Neeraj.jpg", // Placeholder image
  bio: "With over 8 years of experience in educational technology, I'm passionate about helping institutions and educators find the perfect solutions to empower their students. Let's connect and build something great together.",
  instagram: "jareenforthewin",
  email: "neerajbutola8910@gmail.com",
  whatsapp: "+918779341486", // Use international format without symbols for the link
};

// --- "Why Contact Us" Data ---
const contactBenefits = [
  {
    icon: Building,
    title: "Custom Enterprise Plans",
    description:
      "Tailored solutions for large institutions and school districts.",
  },
  {
    icon: Percent,
    title: "Volume Discounts",
    description: "Special pricing for bulk licenses and group purchases.",
  },
  {
    icon: ClipboardCheck,
    title: "Personalized Onboarding",
    description: "Guided setup and training to get your team up and running.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Priority access to a dedicated account manager for any questions.",
  },
];

export default function SalesPage() {
  // Function to format WhatsApp link
  const getWhatsAppLink = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, ""); // Remove all non-digit characters
    return `https://wa.me/${cleanedPhone}`;
  };

  return (
    <div className="min-h-screen bg-background antialiased">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-1.5 text-sm font-medium bg-background border border-border/50"
              >
                Personalized Partnership
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Let's Achieve Your Goals, Together.
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with our team for tailored solutions, enterprise plans,
                and dedicated support to elevate your educational ecosystem.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 -mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Card className="max-w-4xl mx-auto shadow-2xl bg-card/80 backdrop-blur-sm border-border/30">
              <div className="grid md:grid-cols-3">
                {/* Left Side: Avatar and Info */}
                <div className="md:col-span-1 flex flex-col items-center justify-center p-8 bg-muted/30 md:rounded-l-xl">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-background">
                    <ProfileImage src={"/images/Neeraj.jpg"} alt={"Neeraj"} />
                  </Avatar>
                  <h2 className="text-2xl font-bold text-center">Neeraj</h2>
                  <p className="text-muted-foreground text-center">Team Lead</p>
                </div>

                {/* Right Side: Bio and Contact Actions */}
                <div className="md:col-span-2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Hello! I'm here to help.</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-8">{salesRep.bio}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <a
                        href={`mailto:${salesRep.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full">
                          <Mail className="mr-2 h-4 w-4" /> Email
                        </Button>
                      </a>
                      <a
                        href={`https://instagram.com/${salesRep.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full">
                          <Instagram className="mr-2 h-4 w-4" /> Instagram
                        </Button>
                      </a>
                      <a
                        href={getWhatsAppLink(salesRep.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Why Contact Us?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Get access to exclusive benefits and services designed for our
              partners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Reach out today and let's discuss how we can help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${salesRep.email}`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 px-8 py-6 text-base"
                >
                  Schedule a Demo
                  <ChevronRight className="ml-3 h-5 w-5" />
                </Button>
              </a>
              <a
                href={getWhatsAppLink(salesRep.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base shadow-sm hover:shadow-md"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Chat on WhatsApp
                  </span>
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
