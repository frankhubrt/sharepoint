/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true, // Forces Next.js to use <img> instead of <Image />
  },

};

module.exports = nextConfig;

