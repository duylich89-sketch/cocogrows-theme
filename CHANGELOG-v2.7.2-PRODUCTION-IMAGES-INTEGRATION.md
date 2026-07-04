# v2.7.2 – Production Images Integration

Integrated the finalized Cocogrows visual asset pack into the production theme.

## Added assets
- `cocogrows-home-hero.webp`
- `cocogrows-before.webp`
- `cocogrows-after.webp`
- `cocogrows-how-it-works.webp`
- `cocogrows-lifestyle-trust.webp`
- `cocogrows-macro-texture.webp`
- `cocogrows-product-package.webp`
- `cocogrows-lifestyle-cta.webp`

## Homepage updates
- Replaced generated hero illustration with production hero image.
- Replaced empty Before / After visuals with real image assets.
- Connected `Watch It Expand` to `#coiriva-how-it-works`.
- Replaced final CTA icon card with lifestyle CTA image.

## Product page updates
- Added `Coiriva product image pack` section after main product block.
- Uses process, lifestyle, macro texture, and package images without changing Shopify product media.

## Performance notes
- Assets exported as WebP.
- Hero image loads eager/high priority.
- Secondary images lazy-load with async decoding.
