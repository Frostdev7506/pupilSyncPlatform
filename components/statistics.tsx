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
}

const statistics: Statistic[] = [
  {
    icon: Users,
    value: "100,000+",
    label: "Active Students",
    description: "Learning on our platform daily",
  },
  {
    icon: GraduationCap,
    value: "15,000+",
    label: "Educators",
    description: "Creating engaging content",
  },
  {
    icon: School,
    value: "500+",
    label: "Institutions",
    description: "Trust our platform globally",
  },
  {
    icon: BookOpen,
    value: "50,000+",
    label: "Courses",
    description: "Across various subjects",
  },
  {
    icon: Globe,
    value: "75+",
    label: "Countries",
    description: "Worldwide presence",
  },
  {
    icon: Award,
    value: "95%",
    label: "Satisfaction Rate",
    description: "From our users",
  },
];

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

export function Statistics() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
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
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {statistics.map((stat) => (
            <motion.div 
              key={stat.label} 
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-2 hover:border-primary transition-all duration-300 transform-gpu">
                <CardContent className="pt-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <motion.div
                        className="text-3xl font-bold tracking-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {stat.value}
                      </motion.div>
                      <motion.div
                        className="text-sm font-medium text-primary"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {stat.label}
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.p 
                    className="text-muted-foreground mt-3 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {stat.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

  </div>
    </section>
  );
}