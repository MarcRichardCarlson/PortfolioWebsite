/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance optimizations
    compress: true,
    poweredByHeader: false,
    
    // Security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "img-src 'self' data: https: blob:",
                            "font-src 'self' https://fonts.gstatic.com data:",
                            "connect-src 'self' https://api.splinetool.com",
                            "frame-src 'self' https://my.spline.design",
                            "object-src 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'self'",
                            "upgrade-insecure-requests"
                        ].join('; ')
                    }
                ],
            },
        ];
    },
    
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