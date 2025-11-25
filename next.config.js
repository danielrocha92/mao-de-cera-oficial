/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3ugyf2ht6aenh.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
      },
    ],
  },
};

module.exports = nextConfig;