import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Isolate local development from copied caches and production builds.
  distDir: process.env.NODE_ENV === "development" ? ".next-turbo" : ".next",
  turbopack: { root: __dirname },
  experimental: { turbopackFileSystemCacheForDev: false },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easydrop.one",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },

      {
        source: "/sneakers",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
