# Coiriva Ultimate v2.5.5 — Hero Performance Engine

Commit message: `v2.5.5 – Hero Performance Engine`

## Added
- Single LCP hero image preload for product pages using the selected variant media when available.
- `coiriva-hero-performance.css` for hero aspect-ratio lock, CLS protection, and product media intrinsic sizing.
- Hero media marker `data-coiriva-lcp-hero="true"` for targeted performance styling.

## Improved
- First product media is rendered with `loading="eager"`, `fetchpriority="high"`, and `decoding="async"`.
- Gallery images after the first remain lazy-loaded.
- Product image `sizes` and `widths` are tuned for mobile/tablet/desktop to avoid oversized downloads.
- Thumbnail and gallery preload behavior avoids loading the full gallery as high priority.

## Fixed
- Removed duplicate product hero preload blocks from `theme.liquid`.
- Added async decoding and priority consistency for direct `product-media` rendering paths.

## QA checklist
- Product page keeps the same visual layout.
- Only one product hero image is preloaded.
- First product image receives high fetch priority.
- Non-first gallery images remain lazy.
- Theme Editor compatibility preserved.
