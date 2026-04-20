import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API requests to backend to avoid CORS issues
async rewrites() {
    return [
      {
        // Proxy all /api/v1/* requests to the backend
        source: '/api/v1/:path*',
        destination: 'https://admin.istc.co.ke/api/v1/:path*',
      },
      // {
      //   // Proxy /uploads/* to backend uploads folder [DISABLED for local static serving]
      //   source: '/uploads/:path*',
      //   destination: 'https://admin.istc.co.ke/api/v1/:path*',
      // },

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

