import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'utfs.io',
  //       port: '',
  //     },
  //   ],
  // },
  images: {
    remotePatterns: [new URL('https://utfs.io/**')],
  },
};

export default nextConfig;
