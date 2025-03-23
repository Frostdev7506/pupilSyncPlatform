"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight } from "lucide-react";

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

const categories = [
  "All",
  "Technology",
  "Education",
  "Development",
  "Design",
  "Business",
];

const featuredPost = {
  id: 1,
  title: "The Future of Learning Management Systems",
  excerpt: "Discover how AI and machine learning are transforming the way we learn and teach in the digital age.",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  category: "Technology",
  date: "March 15, 2024",
  readTime: "8 min read",
};

const blogPosts = [
  {
    id: 2,
    title: "10 Essential Features Every LMS Should Have",
    excerpt: "A comprehensive guide to the must-have features for modern learning management systems.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    category: "Education",
    date: "March 12, 2024",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Designing User-Friendly Learning Interfaces",
    excerpt: "Best practices for creating intuitive and engaging learning experiences.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400",
    category: "Design",
    date: "March 10, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Rise of Mobile Learning",
    excerpt: "How mobile devices are changing the landscape of education and training.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    category: "Technology",
    date: "March 8, 2024",
    readTime: "4 min read",
  },
  // Add more blog posts as needed
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Featured Post */}
        <motion.div variants={itemVariants} className="mb-16">
          <Link href={`/blog/${featuredPost.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-[400px] w-full">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge>{featuredPost.category}</Badge>
                  <span className="text-sm text-muted-foreground">{featuredPost.date}</span>
                  <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{featuredPost.title}</h1>
                <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                <Button variant="link" className="mt-4 p-0">
                  Read More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link href={`/blog/${post.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge>{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <Button variant="link" className="p-0">
                        Read More <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}