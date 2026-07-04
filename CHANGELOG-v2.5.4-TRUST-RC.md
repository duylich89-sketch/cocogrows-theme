# Coiriva v2.5.4 – Trust Psychology PRO | Release Candidate

## Commit message
`v2.5.4 – Trust Psychology PRO | Release Candidate`

## Improved
- Removed legacy Product Trust Bar render from the product buy box to reduce duplicate trust messaging.
- Removed old emoji trust row inside Smart Bundle addon; the new Trust Layer now owns post-CTA confidence messaging.
- Added conditional wrapper logic so the Trust Layer does not render an empty container when all modules are disabled.
- Added focus-visible styling for accessibility.
- Kept lightweight architecture: inline SVG, no libraries, no external APIs.

## QA notes
- Product Page integration remains directly below Buy Buttons.
- Theme Settings toggles remain available for each trust module.
- Payment, Shipping, Guarantee, Review Summary and Microcopy remain modular snippets.
