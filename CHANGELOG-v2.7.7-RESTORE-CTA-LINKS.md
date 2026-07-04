# v2.7.7 – Restore Homepage CTA Links

- Restored homepage CTA behavior based on the v2.7.2 working state.
- Hardcoded primary CTA to the product page to avoid blank Shopify section settings.
- Hardcoded secondary CTA to `#coiriva-how-it-works`.
- Added `data-coiriva-cta` attributes and a JavaScript fallback so clicks work even if another overlay/style interferes.
- Added CSS overrides to prevent disabled/opacity styles and pointer-event overlays from blocking CTA buttons.
