/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Add fallback to prevent certain server-side modules from causing errors on the client side
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          path: false,
          os: false,
        };
      }
      return config;
    }
};
  
export default nextConfig;  