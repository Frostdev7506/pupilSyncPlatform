// app/blog/[slug]/page.tsx

// This is a Server Component by default (no "use client" here for SSG)

// Import necessary modules and your server utility
import { getPostBySlug, getPostSlugs, BlogPost } from "@/lib/blog.server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { notFound } from 'next/navigation'; // Import notFound helper for App Router
import { Metadata } from 'next'; // For dynamic metadata
import React from "react"; // Need React imported even in Server Components using JSX
import { format } from 'date-fns'; // Import format from date-fns

// --- Static Generation ---
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({ slug }));
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) { return { title: 'Post Not Found' }; }
  return {
    title: `${post.title} | Your Blog Name`,
    description: post.excerpt,
    openGraph: {
      title: post.title, description: post.excerpt,
      images: [ { url: post.image, alt: post.title, } ],
      type: 'article', publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [post.image], },
  };
}

// --- Page Component (Server Component) ---
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) { notFound(); }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Button variant="link" className="mb-8 p-0" asChild>
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <Card>
          <div className="relative h-[400px] w-full">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 800px" />
          </div>

          <CardContent className="p-6 lg:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge>{post.category}</Badge>
              {/* Use date-fns format to ensure string output */}
              <span className="text-sm text-muted-foreground">
                {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : 'No Date'}
              </span>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}