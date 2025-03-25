"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { Statistics } from "@/components/statistics";
import { HeroCarousel } from "@/components/hero-carousel";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Globe,
  Layout,
  LifeBuoy,
  Mail,
  MessageCircle,
  Users,
  Zap,
  ArrowRight,
  BarChart,
  BookCheck,
  FileText,
  Settings,
  Share2,
  Shield,
  Smartphone,
  Star,
} from "lucide-react";
import { StudentSection } from "@/components/sections/student-section";
import { TeacherSection } from "@/components/sections/teacher-section";
import { InstitutionSection } from "@/components/sections/institution-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { ChatModal } from "@/components/chat-modal";

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

const 
features = {
  students: [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic course content and multimedia resources",
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics",
    },
    {
      icon: Users,
      title: "Peer Collaboration",
      description: "Connect and study with classmates in real-time",
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Access your courses anytime, anywhere on any device",
    },
  ],
  teachers: [
    {
      icon: Layout,
      title: "Course Creation",
      description: "Build engaging courses with our intuitive tools",
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Track student performance and engagement metrics",
    },
    {
      icon: FileText,
      title: "Assessment Tools",
      description: "Create and grade assignments with ease",
    },
    {
      icon: MessageCircle,
      title: "Student Feedback",
      description: "Provide personalized feedback and support",
    },
  ],
  institutions: [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security features and compliance",
    },
    {
      icon: Settings,
      title: "Custom Integration",
      description: "Seamlessly integrate with existing systems",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Efficiently manage users at scale",
    },
    {
      icon: Share2,
      title: "Data Analytics",
      description: "Comprehensive reporting and insights",
    },
  ],
};

const testimonials = [
  {
    quote: "Pupil Sync has transformed how we deliver education to our students.",
    author: "Sarah Johnson",
    role: "Principal",
    school: "International Academy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    quote: "The analytics and tracking features have helped improve student outcomes significantly.",
    author: "Michael Chen",
    role: "Department Head",
    school: "Tech University",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
];

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 text-center lg:text-left p-5">
              <motion.div 
                variants={itemVariants}
                className="relative z-10"
              >
                <Badge className="mb-4 p-1.5">Learning Management System</Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Transform Your Learning Experience
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Empower your educational journey with our comprehensive learning
                  management system. Built for students, teachers, and institutions.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground"
                  >
                    Get Started Free
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary/20 hover:border-primary/40"
                  >
                    Book a Demo
                  </Button>
                </div>
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="flex-1 w-full"
            >
              <HeroCarousel className="shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />
      <TestimonialSection />

      {/* Feature Sections */}
      <StudentSection />
      <TeacherSection />
      <InstitutionSection />

      {/* Chat Button and Modal */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat with AI
        </Button>
      </div>
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
      <Footer />
    </div>
  );
}
