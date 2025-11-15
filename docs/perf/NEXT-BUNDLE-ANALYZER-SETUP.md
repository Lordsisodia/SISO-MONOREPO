# Next.js Bundle Analyzer Setup (Optional)

These steps let you generate a route-focused treemap without affecting normal builds.

1) Install dev dependency

```
npm i -D @next/bundle-analyzer
```

2) Create or edit `next.config.js` at repo root

Use a guarded require so the plugin only loads when `ANALYZE=true`.

```js
// next.config.js
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
};

module.exports = withBundleAnalyzer(baseConfig);
```

3) Run an analyzed build

```
ANALYZE=true npm run build
```

Then open the Analyzer UI in the console link that appears. Focus on:
- Chunks containing `portal-architecture/settings` and `mobile/ui/quick-actions`
- Large vendor libs (e.g., `framer-motion`) to confirm reductions after lazy‑loading

Notes
- Keep this config checked in; it’s inert unless `ANALYZE=true` is set.
- If you already use `next.config.mjs`, adapt the syntax accordingly with a guarded dynamic `require`.

