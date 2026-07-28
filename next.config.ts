import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API requests to backend to avoid CORS issues
async rewrites() {
    return [
      // /api/v1/* is handled by app/api/v1/[...path]/route.ts instead of a
      // plain rewrite, since the backend's CORS layer needs the Origin
      // header adjusted when proxied from local dev (see that file).
      {
        // Proxy /uploads/* to backend uploads folder
        source: '/uploads/:path*',
        destination: 'https://admin.istc.co.ke/uploads/:path*',
      },

    ];
  },

  // Enable trailing slashes for better SEO
  trailingSlash: true,

  // images configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.istc.co.ke',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

