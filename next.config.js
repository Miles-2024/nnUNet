/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://localhost:3000', 'http://192.168.1.100:3000'], // TODO: Replace 192.168.1.100 with your actual LAN IP
  },
};

module.exports = nextConfig;
