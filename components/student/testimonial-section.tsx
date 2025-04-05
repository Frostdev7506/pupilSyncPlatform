"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  // Existing Educator Testimonials
  {
    quote: "Pupil Sync has transformed how we deliver education to our students.",
    author: "Sarah Johnson",
    role: "Principal",
    school: "International Academy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", // Female Educator
    rating: 5,
  },
  {
    quote: "The analytics and tracking features have helped improve student outcomes significantly.",
    author: "Michael Chen",
    role: "Department Head",
    school: "Tech University",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", // Male Educator
    rating: 5,
  },
  // New Student Testimonials
  {
    quote: "Keeping track of assignments and accessing course materials is so much easier with Pupil Sync. Everything's in one place!",
    author: "Alex Martinez",
    role: "Student",
    school: "State University",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150", // Male Student
    rating: 5,
  },
  {
    quote: "I love how easy it is to collaborate on group projects and communicate with my professors through the platform.",
    author: "Priya Sharma",
    role: "Student",
    school: "Community College",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", // Female Student
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
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

export function TestimonialSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid-zinc-800/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] dark:bg-grid-white/10" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is visible
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 sm:text-5xl" // Adjusted font size
          >
            Trusted by Educators & Students
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            See what our users have to say about their experience with Pupil Sync.
          </motion.p>
        </motion.div>

        {/* Updated grid to accommodate more testimonials potentially */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger container slightly earlier
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" // Stays 2 columns for wider screens
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author + index} // Use index for potentially non-unique names
              variants={itemVariants}
              // removed custom={index} as staggerChildren handles delay
              className="relative h-full"
            >
              {/* Card with subtle hover effect */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 h-full flex flex-col bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8 flex flex-col h-full"> {/* Adjusted padding */}
                  <Quote className="h-10 w-10 text-primary/20 absolute top-4 right-4 md:top-6 md:right-6 transition-transform duration-300 group-hover:scale-110" />

                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={60}
                        height={60}
                        className="rounded-full object-cover ring-4 ring-background shadow-lg w-[60px] h-[60px]" // Slightly larger shadow
                      />
                      {/* Star badge overlay */}
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 shadow-md">
                        <Star className="h-4 w-4 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    {/* Text content next to image */}
                    <div className="min-w-0 flex-1"> {/* Added flex-1 to take available space */}
                      <p className="font-semibold text-lg tracking-tight truncate text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-sm font-medium text-primary truncate">
                        {testimonial.school}
                      </p>
                    </div>
                  </div>

                  <Separator className="mb-6 bg-border/50" />

                  {/* Quote and rating */}
                  <div className="space-y-4 flex-grow flex flex-col justify-between"> {/* Ensure quote takes space */}
                    {/* Rating Stars */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-yellow-400" // Slightly larger stars
                        />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                         <Star
                           key={`empty-${i}`}
                           className="h-5 w-5 text-muted-foreground/30" // Show empty stars if rating < 5
                         />
                       ))}
                    </div>
                    {/* Testimonial Quote */}
                    <blockquote className="text-lg leading-relaxed text-foreground/90 italic border-l-4 border-primary/30 pl-4 mt-2 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
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