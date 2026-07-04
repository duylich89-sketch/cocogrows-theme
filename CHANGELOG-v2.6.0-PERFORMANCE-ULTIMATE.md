# v2.6.0 – Performance Ultimate

## Commit
`v2.6.0 – Performance Ultimate`

## Added
- Performance release marker and QA notes for the v2.6.0 sprint.
- Page-type aware asset loading strategy in `layout/theme.liquid`.

## Improved
- Product-only Coiriva CSS now loads only on product pages instead of every storefront page.
- Homepage-only Coiriva CSS now loads only on the homepage.
- Product-only Coiriva JavaScript now loads only on product pages.
- Custom Coiriva CSS assets were conservatively minified to reduce transferred CSS bytes.
- Existing product Hero preload from v2.5.5 remains limited to one LCP image.

## Performance impact
- Reduces unused CSS/JS on home, collection, page, cart, and policy pages.
- Reduces global render-blocking CSS pressure.
- Keeps product conversion modules available on product pages.
- Adds no third-party library and no external request.

## QA
- Shopify theme file structure retained.
- `layout/theme.liquid` updated only around Coiriva asset loading.
- 81 JSON files validated successfully.
- No product template or cart behavior intentionally changed.
