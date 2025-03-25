"use client";

import { motion } from "framer-motion";
import { Layout, BarChart, FileText, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Layout,
    title: "Course Creation",
    description: "Build engaging courses with our intuitive tools",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Track student performance and engagement metrics",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: FileText,
    title: "Assessment Tools",
    description: "Create and grade assignments with ease",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: MessageCircle,
    title: "Student Feedback",
    description: "Provide personalized feedback and support",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.7
    }
  },
  hover: {
    y: -8,
    rotate: -1,
    transition: { duration: 0.3 }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

export function TeacherSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={titleVariants}>
            <Badge 
              variant="secondary" 
              className="mb-6 px-4 py-1.5 text-sm font-medium bg-background border border-border/50 hover:bg-primary/5 transition-colors"
            >
              For Educators
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 leading-tight"
          >
            Empower Your <br className="hidden sm:block"/> Teaching Experience
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Professional tools designed to help you create, manage, and deliver exceptional learning experiences.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="p-8 h-full border border-border/40 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className={`${feature.bgColor} rounded-xl p-3 w-fit mb-6 transition-all duration-300 group-hover:rotate-6`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`w-8 h-1 ${feature.bgColor} rounded-full`}></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all group"
          >
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              Get Started Teaching
            </span>
            <ArrowRight className="ml-3 h-5 w-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Join our community of passionate educators
          </p>
        </motion.div>
      </div>
    </section>
  );
}