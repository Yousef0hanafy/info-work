import type { NextConfig } from "next";
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    'preview-chat-926184af-7dae-41fd-9943-dce06e1ce6e0.space-z.ai',
  ],
};

export default withNextIntl(nextConfig);