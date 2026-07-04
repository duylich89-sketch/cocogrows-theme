# Coiriva v2.5.5 – Mobile CRO PRO

## Commit message

```text
v2.5.5 – Mobile CRO PRO
```

## Added

- `assets/coiriva-mobile-cro.css`
- `assets/coiriva-mobile-cro.js`
- Mobile-first conversion layer for product pages.

## Improved

- Mobile Buy Box spacing and visual hierarchy.
- Mobile price readability and offer chip sizing.
- Bundle card tap targets and spacing.
- Quantity selector tap targets.
- CTA height, radius, active state and thumb-zone usability.
- Trust Layer spacing under CTA.
- Payment icons wrapping on narrow screens.
- Shipping/guarantee cards reduced in height on mobile.
- Sticky Add To Cart redesigned into a compact 2-column mobile bar.
- Safe-area padding for iPhone bottom bars.

## Performance notes

- No external libraries.
- No new CDN requests.
- CSS/JS loaded as theme assets only.
- JS is mobile-aware and lightweight.

## QA checklist

- [x] Shopify theme structure preserved.
- [x] Desktop styles minimally affected.
- [x] Mobile CTA remains easy to tap.
- [x] Sticky CTA respects safe-area inset.
- [x] Bundle cards remain keyboard-accessible through existing logic.
- [x] Trust Layer remains below CTA and does not push primary CTA too far down.

## Files changed

- `layout/theme.liquid`
- `assets/coiriva-mobile-cro.css`
- `assets/coiriva-mobile-cro.js`
- `CHANGELOG-v2.5.5-MOBILE-CRO.md`
