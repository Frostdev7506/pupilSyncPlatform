"use client";

import { motion } from "framer-motion";
import { BookOpen, BarChart, Users, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Engage with dynamic course content and multimedia resources",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: BarChart,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Peer Collaboration",
    description: "Connect and study with classmates in real-time",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Access your courses anytime, anywhere on any device",
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
      damping: 12,
      stiffness: 100,
      duration: 0.5
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function StudentSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
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
              className="mb-6 px-4 py-1.5 text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              For Students
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 leading-tight md:h-[104px]"
          >
            Transform Your <br className="hidden sm:block"/> Learning Experience
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Discover powerful tools and resources designed to accelerate your academic success and make learning enjoyable.
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
              <Card className="p-8 h-full border-border/50 bg-background/70 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <div className={`${feature.bgColor} rounded-2xl p-4 w-fit mb-6 transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
            className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Start Learning Now
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Join thousands of successful students today
          </p>
        </motion.div>
      </div>
    </section>
  );
}