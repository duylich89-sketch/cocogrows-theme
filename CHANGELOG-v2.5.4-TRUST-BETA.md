# Coiriva v2.5.4 – Trust Psychology PRO Beta

Commit message:

```text
v2.5.4 – Trust Psychology PRO | Premium UI Beta
```

## Added
- Premium design controls in Theme Settings:
  - Primary trust color
  - Card background
  - Corner radius
- CSS variables for Trust Layer styling.

## Improved
- Product Page Trust Layer now appears directly under Buy Buttons.
- Removed legacy delivery/guarantee block from the Buy Button area to avoid duplicated trust messaging.
- Tightened mobile spacing for a cleaner above-the-fold buying experience.
- Improved payment confidence pills and trust cards for a more premium DTC look.
- Reduced animation sensitivity and respected reduced-motion settings.

## Performance
- No external libraries.
- No CDN.
- No PNG payment icons.
- CSS remains under 5 KB.
- JS remains under 1 KB.
- No new network requests beyond Shopify asset loading.

## QA Notes
- Product Page integration preserved existing Buy Buttons, bundle logic, and sticky ATC structure.
- Review summary remains hidden if no supported review data is detected.
