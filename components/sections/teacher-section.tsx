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
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function TeacherSection() {
  return (
    <section className="py-20 bg-dot-pattern relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">For Teachers</Badge>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
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
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="p-6 h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-primary/10">
                <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
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
          <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary/40">
            Start Teaching
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}