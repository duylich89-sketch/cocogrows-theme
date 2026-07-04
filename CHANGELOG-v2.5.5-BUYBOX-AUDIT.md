# Coiriva v2.5.5 – Buy Box Audit PRO

## Commit message
`v2.5.5 – Premium Buy Box Audit`

## Added
- Premium price hierarchy styles for product price, compare price and save badges.
- Smart value summary under bundle cards.
- Value meter for Good / Better / Best Value / Max Savings decisions.
- Sticky cart sync for selected pack, price, savings and CTA copy.
- CTA loading state and aria-busy support.

## Improved
- Bundle cards now emphasize price per brick, savings, selected state and keyboard focus.
- Mobile Buy Box spacing is tighter while keeping tap targets comfortable.
- Quantity selector and CTA styling are more consistent with the Coiriva premium design system.
- Removed duplicate bundle click logic from buybox JS; Smart Bundle JS is now the source of truth.

## QA checklist
- Product page Buy Box keeps the existing bundle quantity sync.
- Sticky Add To Cart remains functional.
- No new external libraries, fonts or CDN requests.
- CSS/JS changes are scoped to Coiriva Buy Box components.
