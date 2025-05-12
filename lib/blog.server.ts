// lib/blog.server.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  isFeatured?: boolean;
  [key: string]: any;
}

export interface BlogPost extends PostData {
    contentHtml: string;
}

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
      console.warn(`Blog post not found for slug: ${slug}`);
      return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Explicitly pick properties from matterResult.data *excluding* slug
  const { slug: frontmatterSlug, ...otherFrontmatter } = matterResult.data as PostData;

  return {
    slug, // Use the slug derived from the filename
    contentHtml,
    ...otherFrontmatter, // Spread the rest of the frontmatter data
  };
}

export async function getAllPostsData(): Promise<PostData[]> {
  const slugs = getPostSlugs();

  const posts = await Promise.all(slugs.map(async slug => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Explicitly pick properties from matterResult.data *excluding* slug
     const { slug: frontmatterSlug, ...otherFrontmatter } = matterResult.data as PostData;

    return {
      slug, // Use the slug derived from the filename
      ...otherFrontmatter, // Spread the rest of the frontmatter data
    };
  }));

  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return posts;
}

export async function getFeaturedPostData(): Promise<PostData | undefined> {
    const allPosts = await getAllPostsData();
    const featured = allPosts.find(post => post.isFeatured);
    return featured || allPosts[0];
}

export async function getUniqueCategories(): Promise<string[]> {
    const allPosts = await getAllPostsData();
    const categories = allPosts.map(post => post.category);
    return Array.from(new Set(categories))
           .filter(Boolean)
           .sort((a, b) => a.localeCompare(b));
}