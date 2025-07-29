/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
  experimental: {
    serverActions: true, // ✅ Enable server actions
  },
};

module.exports = nextConfig;
