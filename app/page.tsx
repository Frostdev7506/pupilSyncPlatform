"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
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

const features = {
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
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Transform Your Learning Experience
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="mt-6 text-xl text-muted-foreground"
              >
                Empower your educational journey with our comprehensive learning
                management system. Built for students, teachers, and institutions.
              </motion.p>
              <motion.div 
                variants={itemVariants}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" className="bg-primary text-primary-foreground">
                  Get Started Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a Demo
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="flex-1 w-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                alt="Learning Platform"
                width={1000}
                height={600}
                className="home_image rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Students Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">For Students</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Enhance Your Learning Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access world-class education tools and resources designed to help you succeed.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.students.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button size="lg">
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">For Teachers</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Powerful Tools for Educators
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create engaging courses and track student progress with our comprehensive toolkit.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.teachers.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button size="lg">
              Start Teaching
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Institutions Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">For Institutions</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Enterprise-Grade Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scale your educational programs with our secure and flexible platform.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.institutions.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button size="lg">
              Contact Sales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Leading Institutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about their experience with Pupil Sync.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={itemVariants}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.school}
                      </p>
                    </div>
                  </div>
                  <p className="italic">{testimonial.quote}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button size="lg" className="rounded-full shadow-lg">
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat with us
        </Button>
      </div>
      <Footer />
    </div>
  );
}
