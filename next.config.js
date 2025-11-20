const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
  analyzerMode: "static",
  reportFilename: ({ isServer }) =>
    isServer ? "../analyze/server.html" : "analyze/client.html",
  statsFilename: ({ isServer }) =>
    isServer ? "../analyze/server.json" : "analyze/client.json",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cacheComponents: true,
  },
  webpack(config) {
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
