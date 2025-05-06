/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false // Disable the experimental CSS optimization
  },
  webpack: (config, { isServer }) => {
    // Add a fallback for the lightningcss module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
}

module.exports = nextConfig 