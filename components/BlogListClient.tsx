// components/BlogListClient.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight } from "lucide-react";
import { PostData } from "@/lib/blog.server";
import { format } from 'date-fns'; // Import format from date-fns


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

interface BlogListClientProps {
    allPosts: PostData[];
    featuredPost?: PostData;
    availableCategories: string[];
}

const BlogListClient = React.memo(({ allPosts, featuredPost, availableCategories }: BlogListClientProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const categories = ["All", ...availableCategories];

  const filteredPosts = React.useMemo(() => {
      if (!allPosts.length) return [];

      return allPosts.filter(post => {
        if (featuredPost && post.slug === featuredPost.slug) {
            return false;
        }

        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  }, [allPosts, featuredPost, selectedCategory, searchQuery]);


  return (
    <motion.div
      className="container mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {featuredPost && (
        <motion.div variants={itemVariants} className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-[400px] w-full">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge>{featuredPost.category}</Badge>
                  {/* Use date-fns format */}
                  <span className="text-sm text-muted-foreground">
                    {featuredPost.date ? format(new Date(featuredPost.date), 'MMMM d, yyyy') : 'No Date'}
                  </span>
                  <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{featuredPost.title}</h1>
                <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                <Button variant="link" className="mt-4 p-0" asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <span>
                      Read More <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      )}


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

      {filteredPosts.length > 0 ? (
           <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.slug} variants={itemVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow flex flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <Badge>{post.category}</Badge>
                          {/* Use date-fns format */}
                          <span className="text-sm text-muted-foreground">
                             {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : 'No Date'}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{post.excerpt}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{post.readTime}</span>
                          <Button variant="link" className="p-0" asChild>
                              <Link href={`/blog/${post.slug}`}>
                                  <span>
                                      Read More <ChevronRight className="ml-2 h-4 w-4" />
                                  </span>
                              </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
      ) : (
          <motion.div variants={itemVariants} className="text-center text-muted-foreground">
              No articles found matching your criteria.
          </motion.div>
      )}
    </motion.div>
  );
});

BlogListClient.displayName = 'BlogListClient';

export default BlogListClient;