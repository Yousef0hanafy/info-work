import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: [
    'preview-chat-926184af-7dae-41fd-9943-dce06e1ce6e0.space-z.ai',
  ],
};

export default nextConfig;