/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    /**
     * NOTE FOR DEPLOYMENT:
     * If new external domains or patterns are needed in production (e.g., if you're 
     * pulling images from other APIs), make sure to update this array and redeploy.
     */
    remotePatterns: [
      {
        /**
         * Allow image optimization from localhost.
         * 
         * This configuration is mainly for development purposes when serving images 
         * from the local environment (e.g., `http://localhost:3000` during development).
         * 
         * NOTE FOR DEPLOYMENT:
         * This entry can usually be removed for production environments, as images will
         * not be served from localhost in a production build. If using localhost in a 
         * production-like environment (e.g., Docker with `localhost` references), adjust 
         * the settings accordingly.
         */
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Default Next.js development server port; adjust if needed
        pathname: "/**", // Wildcard pattern for all image paths
      },
      {
        /**
         * Allow image optimization from the Sanity CDN (cdn.sanity.io).
         * 
         * NOTE FOR DEPLOYMENT:
         * Ensure this configuration is correct if Sanity is used in production. 
         * If additional CDNs are integrated later, you'll need to add more entries 
         * to `remotePatterns`. Remember to adjust the `hostname` and `protocol` based 
         * on the new CDN.
         */
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**", // Match all image paths from the CDN
      },
    ],
  },

  /**
   * Further deployment configurations, like headers, rewrites, redirects,
   * or performance optimizations, can be added here based on project needs.
   * 
   * NOTE FOR DEPLOYMENT:
   * - Adjust the `basePath` and `assetPrefix` options if deploying to a subdirectory.
   * - Consider enabling `compression` for better performance in production.
   * - Ensure the `NEXT_PUBLIC_*` environment variables are correctly configured in your hosting provider.
   */
};

module.exports = nextConfig;
