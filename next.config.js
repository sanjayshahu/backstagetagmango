//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'testing.assets.bpasses.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.bpasses.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

module.exports = nextConfig;
