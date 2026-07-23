import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
