"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { PlatformImpactStats } from "@/components/institution/statistics";
import { HeroCarousel } from "@/components/hero-carousel";
import { CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import { InstitutionSection } from "@/components/sections/institution-section";

import { TestimonialSection } from "@/components/sections/testimonial-section";
import { ChatModal } from "@/components/chat-modal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.7
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function InstitutionPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background antialiased">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                variants={itemVariants}
                className="relative z-10 space-y-6"
              >
                <Badge
                  variant="secondary"
                  className="mb-4 px-4 py-1.5 text-sm font-medium bg-background border border-border/50 hover:bg-primary/5 transition-colors"
                >
                  Institutional Excellence
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 2xl:h-[126px]">
                  Transform Your <br className="hidden lg:block" />Educational Institution
                </h1>
                <motion.p
                  variants={fadeIn}
                  className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                >
                  Comprehensive solutions for schools and universities to streamline operations, enhance learning outcomes, and empower educators.
                </motion.p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div variants={itemVariants}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 px-8 py-6 text-base"
                    >
                      Schedule Demo
                      <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base shadow-sm hover:shadow-md"
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Request Pricing
                      </span>
                    </Button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base shadow-sm hover:shadow-md"
                      asChild
                    >
                      <Link href="/institution/dashboard">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Access Dashboard
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  variants={fadeIn}
                  className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Compliance ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Trusted by 500+ institutions</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="flex-1 w-full max-w-2xl"
              whileHover={{ scale: 1.01 }}
            >
              <HeroCarousel className="rounded-2xl shadow-2xl border border-border/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

    <PlatformImpactStats />

      <TestimonialSection />
      <InstitutionSection />


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
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join leading educational institutions revolutionizing education with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 px-8 py-6 text-base"
              >
                Contact Sales
                <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base shadow-sm hover:shadow-md"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Download Whitepaper
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          size="lg"
          className="rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Support Assistant
        </Button>
      </motion.div>
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      <Footer />
    </div>
  );
}