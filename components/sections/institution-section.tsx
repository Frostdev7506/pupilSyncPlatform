"use client";

import { motion } from "framer-motion";
import { Shield, Settings, Users, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
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

export function InstitutionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">For Institutions</Badge>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
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
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
              custom={index}
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
          <Button size="lg" variant="default">
            Contact Sales
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}