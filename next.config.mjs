/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance optimizations
    compress: true,
    poweredByHeader: false,
    
    // Image optimization
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60,
      qualities: [75, 90, 100],
    },
    
    // Experimental features for performance
    experimental: {
      optimizePackageImports: ['framer-motion', 'lucide-react'],
    },
    
    webpack: (config, { isServer }) => {
      // Add fallback to prevent certain server-side modules from causing errors on the client side
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          path: false,
          os: false,
        };
      }
      
      // Optimize bundle size - simplified to avoid conflicts
      if (config.optimization) {
        config.optimization.moduleIds = 'deterministic';
      }
      
      return config;
    }
};
  
export default nextConfig;  