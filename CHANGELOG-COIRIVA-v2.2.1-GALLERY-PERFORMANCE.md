# Coiriva Ultimate v2.2.1 – Product Foundation | Task 2 | Gallery Performance

## Changed
- Added product featured image preload on product pages to improve LCP.
- Added `coiriva-gallery-performance.css` for smoother gallery transitions and reduced layout shift.
- Added `coiriva-gallery-performance.js` to update gallery counter, warm the next images, and stabilize mobile gallery behavior.
- Added performance class and media count data to `product-media-gallery.liquid`.
- Improved first product image priority and kept non-primary images lazy-loaded.

## Files changed
- `layout/theme.liquid`
- `snippets/product-media-gallery.liquid`
- `snippets/product-thumbnail.liquid`
- `assets/coiriva-gallery-performance.css`
- `assets/coiriva-gallery-performance.js`

## Test checklist
- Product page loads without Liquid errors.
- First gallery image loads first.
- Gallery counter updates when switching images.
- Thumbnail active state still works.
- Mobile swipe remains smooth.
- Add to Cart still works.
