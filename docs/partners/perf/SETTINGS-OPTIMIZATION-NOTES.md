# Settings Performance Optimization Notes

Date: 2025-11-12

Scope: Partners mobile routes – Settings hub and detail pages, Inbox, Messages.

Key changes:
- Lazy-load all settings views with `next/dynamic` and shared loader.
- Route-level `loading.tsx` added for multiple mobile routes.
- Drawer mounts on demand; animated background deferred to idle and respects Reduce Motion.
- Menu items memoized; highlight cards avoid first-paint motion.
- Intent-based prefetch on hover/touch for common targets.

Follow-ups:
- Consider image asset audit under Profile/Account.
- Optionally add onTouchStart prefetch to Inbox/Messages entry points outside the drawer.

