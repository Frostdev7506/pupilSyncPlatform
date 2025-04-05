"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const studentHeroImages = [
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    alt: "Students studying in library with books and laptops",
  },
  {
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800",
    alt: "Student taking notes during lecture",
  },
  {
    src: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=800",
    alt: "Collaborative learning in workshop environment",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
    alt: "Person learning through digital tablet",
  },
  {
    src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    alt: "Learning with open books on wooden desk",
  },
  {
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    alt: "Student focused on learning in bright environment",
  },
];

export function StudentHeroCarousel({ className }: { className?: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className={cn("w-full", className)}
    >
      <CarouselContent>
        {studentHeroImages.map((image, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-2xl object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {studentHeroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index ? "bg-white scale-100" : "bg-white/50 scale-75"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}