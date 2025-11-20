const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../analyze/nodejs.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../analyze/client.html',
      generateStatsFile: true,
      statsFilename: 'static/analyze/client.json',
    },
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disabled to reduce double effects/logs during dev
  reactStrictMode: false,
  experimental: {
    cacheComponents: false,
  },
  typescript: { ignoreBuildErrors: true },

  env: {
    NEXT_PUBLIC_APP_NAME: 'SISO',
  },

  async rewrites() {
    return [
      // Preserve older single-partner prefix while moving to /partners
      { source: '/partner/academy', destination: '/partners/academy' },
      { source: '/partner/academy/:path*', destination: '/partners/academy/:path*' },
      { source: '/partner/training-spotlight', destination: '/partners/academy/training-spotlight' },
      { source: '/partners-academy', destination: '/partners/academy' },
      { source: '/partners-academy/:path*', destination: '/partners/academy/:path*' },
      // Optional: legacy learning path to academy
      { source: '/partners/learning', destination: '/partners/academy' },
      { source: '/partners/learning/:path*', destination: '/partners/academy/:path*' },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
