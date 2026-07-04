# v2.7.3 – Production Image Pack

## Scope
Homepage-only production image integration using clean standalone assets, not storyboard/collage images.

## Changed
- Replaced hero illustration fallback with clean Cocogrows hero product image.
- Replaced Before / After generated CSS placeholders with standalone production images.
- Replaced final CTA icon card with lifestyle CTA image.
- Added product package fallback image for Best Seller section.
- Fixed homepage CTA links:
  - Shop Coco Coir → product page
  - Watch It Expand / See How It Works → How It Works section
- Disabled the old fake 90% statistics section for cleaner production trust.

## Performance
- WebP assets added to theme assets.
- Hero image loads eager/high priority.
- Below-fold images load lazy.

## QA
- JSON validated.
- Liquid changes are isolated to homepage visual fallbacks and image sections.
