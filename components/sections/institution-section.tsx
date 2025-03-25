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
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Settings,
    title: "Custom Integration",
    description: "Seamlessly integrate with existing systems",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Efficiently manage users at scale",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Share2,
    title: "Data Analytics",
    description: "Comprehensive reporting and insights",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.7
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.3 }
  }
};

export function InstitutionSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-1.5 border-blue-500/30 text-blue-500 bg-blue-500/5 hover:bg-blue-500/10"
          >
            For Institutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 leading-tight">
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
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover="hover"
              className="group"
              custom={index}
            >
              <Card className="p-8 h-full border border-border/40 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className={`${feature.bgColor} rounded-xl p-3 w-fit mb-6 transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            className="border-2 border-blue-500/20 bg-background/80 hover:bg-blue-500/5 hover:border-blue-500/40 px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all group"
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Contact Sales
            </span>
            <ArrowRight className="ml-3 h-5 w-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Schedule a demo with our team
          </p>
        </motion.div>
      </div>
    </section>
  );
}