// app/blog/page.tsx

// This is a Server Component by default (no "use client" here)

// Import the server-side data fetching utilities
import { getAllPostsData, getFeaturedPostData, getUniqueCategories, PostData } from "@/lib/blog.server";
// Import the client component that handles rendering and interactivity
import BlogListClient from "@/components/BlogListClient";
import { Metadata } from "next"; // For static metadata
import React from "react"; // Need React imported

// Static Metadata for the blog index page
export const metadata: Metadata = {
  title: 'Blog | Your Blog Name', // Customize title structure
  description: 'Read our latest articles and insights on [Your Topic].', // Customize description
  // Add Open Graph, Twitter, etc. meta for the index page if needed
};

export default async function BlogPage() { // This is an async function (Server Component)
  // Fetch data on the server/at build time using the server utility
  const allPosts = await getAllPostsData();
  const featuredPost = await getFeaturedPostData();
  const uniqueCategories = await getUniqueCategories(); // Await this async function

  return (
    <div className="min-h-screen bg-background py-12">
      {/* Pass the fetched data and categories to the client component */}
      <BlogListClient
         allPosts={allPosts} // Pass all posts metadata
         featuredPost={featuredPost} // Pass featured post metadata
         availableCategories={uniqueCategories} // Pass available categories (resolved array)
       />
    </div>
  );
}