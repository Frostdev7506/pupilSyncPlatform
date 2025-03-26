"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  School,
  Globe,
  BookOpen,
  Award,
} from "lucide-react";

interface Statistic {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const statistics: Statistic[] = [
  {
    icon: Users,
    value: "100,000+",
    label: "Active Students",
    description: "Learning on our platform daily",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: GraduationCap,
    value: "15,000+",
    label: "Educators",
    description: "Creating engaging content",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: School,
    value: "500+",
    label: "Institutions",
    description: "Trust our platform globally",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    value: "50,000+",
    label: "Courses",
    description: "Across various subjects",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Globe,
    value: "75+",
    label: "Countries",
    description: "Worldwide presence",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Award,
    value: "95%",
    label: "Satisfaction Rate",
    description: "From our users",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.7
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.6,
      ease: "backOut"
    }
  })
};

export function Statistics() {
  return (
    <section className="flex justify-center py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="container px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering education through innovative technology and global reach
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {statistics.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              variants={itemVariants}
              whileHover="hover"
              custom={index}
            >
              <Card className="border border-border/40 bg-background/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <motion.div
                      className={`p-4 rounded-xl ${stat.bgColor} flex-shrink-0`}
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring" }}
                    >
                      <stat.icon className={`h-7 w-7 ${stat.color}`} />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <motion.div
                        className="text-3xl font-bold tracking-tight"
                        variants={textVariants}
                        custom={0}
                      >
                        {stat.value}
                      </motion.div>
                      <motion.h3
                        className={`text-lg font-semibold ${stat.color}`}
                        variants={textVariants}
                        custom={1}
                      >
                        {stat.label}
                      </motion.h3>
                      <motion.p 
                        className="text-muted-foreground mt-2"
                        variants={textVariants}
                        custom={2}
                      >
                        {stat.description}
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}