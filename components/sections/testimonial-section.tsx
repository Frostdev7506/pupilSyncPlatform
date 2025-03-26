"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    quote: "Pupil Sync has transformed how we deliver education to our students.",
    author: "Sarah Johnson",
    role: "Principal",
    school: "International Academy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
  },
  {
    quote: "The analytics and tracking features have helped improve student outcomes significantly.",
    author: "Michael Chen",
    role: "Department Head",
    school: "Tech University",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
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
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 sm:h-[43px]">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={itemVariants}
              custom={index}
              className="relative h-full"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 h-full flex flex-col">
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="h-10 w-10 text-primary/20 absolute top-6 right-6" />
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={60}
                        height={60}
                        className="rounded-full object-cover ring-4 ring-background shadow-xl w-[60px] h-[60px]"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1">
                        <Star className="h-4 w-4 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-lg tracking-tight truncate">
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

                  <Separator className="mb-6" />

                  <div className="space-y-4 flex-grow">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
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