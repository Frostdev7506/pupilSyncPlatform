// lib/blog.ts

export interface BlogPost {
    slug: string; // Unique identifier for URL
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    markdownContent: string; // The actual Markdown content string
    isFeatured?: boolean; // Optional flag for featured post
  }
  
  // --- Your Client-Side Blog Data (Hardcoded Markdown) ---
  // Add your blog posts here directly in the code
  const allPosts: BlogPost[] = [
    {
      slug: "the-future-of-lms",
      title: "The Future of Learning Management Systems",
      excerpt: "Discover how AI and machine learning are transforming the way we learn and teach in the digital age.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000", // Use higher res for featured
      category: "Technology",
      date: "March 15, 2024",
      readTime: "8 min read",
      isFeatured: true,
      markdownContent: `
  # The Future of Learning Management Systems
  
  This is the **full content** of the featured blog post. Let's dive deeper into the details.
  
  ## Introduction
  Learning Management Systems (LMS) have been a cornerstone of digital education for decades. However, the landscape is rapidly evolving, driven by technological advancements like Artificial Intelligence (AI) and Machine Learning (ML).
  
  ## The Role of AI and ML
  AI and ML are poised to revolutionize LMS platforms in several ways:
  *   **Personalized Learning Paths:** AI can analyze student performance data to recommend tailored content and learning sequences.
  *   **Automated Grading and Feedback:** ML models can assist in grading assessments and providing instant, constructive feedback.
  *   **Predictive Analytics:** Identifying students at risk of falling behind and enabling proactive intervention.
  *   **Intelligent Content Curation:** Automatically recommending relevant resources based on user interaction and learning goals.
  
  ### Challenges
  While promising, implementing these features comes with challenges:
  1.  Data privacy concerns.
  2.  Need for large datasets to train models.
  3.  Ensuring ethical use of AI in education.
  
  ## Looking Ahead
  The future LMS will be more than just a repository of courses. It will be an intelligent, adaptive learning partner that caters to individual needs and optimizes the learning process.
  
  \`\`\`javascript
  // Example code block
  function greet(name) {
    console.log("Hello, " + name + "!");
  }
  greet("World");
  \`\`\`
  
  > This is a blockquote about the future.
  
  *Stay tuned for more insights!*
  `,
    },
    {
      slug: "10-essential-lms-features",
      title: "10 Essential Features Every LMS Should Have",
      excerpt: "A comprehensive guide to the must-have features for modern learning management systems.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
      category: "Education",
      date: "March 12, 2024",
      readTime: "5 min read",
      markdownContent: `
  # 10 Essential Features Every LMS Should Have
  
  This post details the key features needed for a modern LMS.
  
  1.  **User Management:** Easy registration, roles, and permissions are fundamental.
  2.  **Course Management:** Intuitive tools to create, update, and organize courses and content.
  3.  **Content Creation Tools:** Built-in editors or seamless integrations with external tools.
  4.  **Assessment Engine:** Robust capabilities for quizzes, assignments, and varied grading methods.
  5.  **Reporting & Analytics:** Detailed insights into user progress and platform usage.
  6.  **Communication Tools:** Features like forums, messaging, or announcements to facilitate interaction.
  7.  **Mobile Responsiveness:** Essential for accessibility on all devices.
  8.  **Integrations:** Ability to connect with HR systems, CRM, or other educational tools.
  9.  **Security:** Protecting user data and ensuring secure access.
  10. **Scalability:** The system must be able to handle a growing number of users and content.
  
  These features ensure a robust and effective learning environment.
  `,
    },
    {
      slug: "designing-user-friendly-learning-interfaces",
      title: "Designing User-Friendly Learning Interfaces",
      excerpt: "Best practices for creating intuitive and engaging learning experiences.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600",
      category: "Design",
      date: "March 10, 2024",
      readTime: "6 min read",
      markdownContent: `
  # Designing User-Friendly Learning Interfaces
  
  Creating an effective learning experience heavily relies on the user interface design. Here are some best practices:
  
  *   **Simplicity:** Avoid clutter. Keep the layout clean and navigation straightforward.
  *   **Consistency:** Use consistent design elements, terminology, and navigation patterns throughout the platform.
  *   **Accessibility:** Design for all users, considering different abilities and devices. Follow WCAG guidelines.
  *   **Feedback:** Provide clear and immediate feedback for user actions.
  *   **Visual Hierarchy:** Use headings, spacing, and visual cues to guide the user's eye and organize information.
  *   **Engagement:** Incorporate interactive elements, multimedia, and gamification where appropriate.
  *   **Minimize Cognitive Load:** Break down complex information into smaller, manageable chunks.
  
  A well-designed interface makes learning more enjoyable and effective.
  `,
    },
    {
      slug: "the-rise-of-mobile-learning",
      title: "The Rise of Mobile Learning",
      excerpt: "How mobile devices are changing the landscape of education and training.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      category: "Technology",
      date: "March 8, 2024",
      readTime: "4 min read",
      markdownContent: `
  # The Rise of Mobile Learning
  
  Mobile learning (m-learning) has become increasingly prevalent due to the widespread use of smartphones and tablets.
  
  ## Impact on Education
  Mobile devices offer flexibility and accessibility, allowing learners to access content anytime, anywhere. This is particularly beneficial for:
  *   Just-in-time learning
  *   Microlearning modules
  *   Corporate training for employees in the field
  
  ## Key Considerations for Mobile Learning
  *   **Content Adaptability:** Ensure content is responsive and displays correctly on various screen sizes.
  *   **Offline Access:** Provide options for downloading content for offline consumption.
  *   **User Experience:** Design interactions specifically for touch interfaces.
  *   **Integration:** Ensure mobile platforms integrate smoothly with existing LMS infrastructure.
  
  Mobile learning is no longer an add-on but a core component of modern educational strategies.
  `,
    },
    // Add more blog posts here following the same structure
  ];
  
  // Sort posts by date (descending) - useful for index page
  const sortedPosts = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  export const getAllPosts = (): BlogPost[] => {
    return sortedPosts;
  };
  
  export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return allPosts.find(post => post.slug === slug);
  };
  
  export const getFeaturedPost = (): BlogPost | undefined => {
      // Find an explicitly featured post first, or return the latest one
      const featured = sortedPosts.find(post => post.isFeatured);
      return featured || sortedPosts[0]; // Return the found featured post or the very first (latest) post
  }
  
  // Get unique categories for filtering
  export const getUniqueCategories = (): string[] => {
      const categories = allPosts.map(post => post.category);
      return Array.from(new Set(categories)).filter(Boolean); // Filter out potential empty strings
  }