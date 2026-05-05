import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "developers.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },

  //removed eslint because its not supported in newer next js versions
  
  // eslint: {
  //   ignoreDuringBuilds: true,
  // }, 
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
