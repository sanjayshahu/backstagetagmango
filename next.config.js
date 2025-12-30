//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  transpilePackages: ['@backstage-pass/api'],
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

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
