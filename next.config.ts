import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    // Vercel sets VERCEL_GIT_COMMIT_SHA at build time but doesn't expose it to
    // client code itself; re-export a short SHA under NEXT_PUBLIC_ so the footer's
    // version button can show it. Empty outside Vercel (e.g. local dev/build).
    NEXT_PUBLIC_GIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? '',
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/lidmaatschap', destination: '/#lidmaatschap', permanent: true },
      { source: '/impressions', destination: '/#impressions', permanent: true },
      { source: '/leden', destination: '/#leden', permanent: true },
      { source: '/map', destination: '/#map', permanent: true },
      { source: '/reglement', destination: '/#reglement', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};

export default nextConfig;
