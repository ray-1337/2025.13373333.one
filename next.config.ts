import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  compress: true,

  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["three", "@mantine/core"]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' ${process.env.NODE_ENV === "development" ? "'unsafe-eval' 'unsafe-inline'" : ""} https://static.cloudflareinsights.com/beacon.min.js;
              style-src 'self' 'unsafe-inline' https://api.fontshare.com/;
              img-src 'self' https://saint-chroma.cdn.13373333.one/ https://i.ytimg.com/vi/ https://cdn.simpleicons.org/;
              media-src 'self' https://saint-chroma.cdn.13373333.one/;
              font-src 'self' https://cdn.fontshare.com/;
              frame-src https://www.youtube-nocookie.com;
              connect-src 'self' https://cloudflareinsights.com/;
              upgrade-insecure-requests;
            `.replace(/\r|\n/g, '')
          },
        ],
      },
    ]
  }
};

export default nextConfig;
