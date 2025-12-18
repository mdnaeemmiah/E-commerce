import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: 'http',  // Allow http protocol for local or internal services
        hostname: '10.10.7.85',  // Specify the IP or hostname for the image source
      },
      {
        protocol: 'https',  // Allow https protocol for general remote images
        hostname: '**',  // Allow all https sources
      },
    ],
  },
};

export default nextConfig;
