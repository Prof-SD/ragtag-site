# Website verification — 22 November 2026

## Completed

- `npm run build`: five static pages and sixteen original, path-drawn heading illustrations generated successfully.
- `npm run check`: all five pages and 160 local link/anchor/asset references checked, plus CSS resources, required metadata, image alternatives, current control terminology, free/paid counts and Vercel settings.
- Browser review of the desktop homepage, illustrated kindness and garden sections, phone homepage and family guide, privacy page and 404 screen.
- Browser layout checks of all four primary pages at 320, 768 and 1280 CSS pixels: no horizontal overflow or broken loaded images. Additional visual/interactivity review at 390 pixels.
- Gallery selection changed the visible capture and selected state. Ribbon Woods, Cloud Quilt and Lantern Hollow selection displayed the matching heading/content.
- Native FAQ opened with Enter; purchase-restore FAQ opened by click and displayed the correct guidance.
- Local HTTP checks: primary routes, CSS and JS return 200; unknown route returns the custom 404 with status 404; `/support.html` redirects to `/support`; security headers are present.
- No browser script errors observed during initial page and interaction checks. The deliberate missing-page test returns an expected 404.
- A copied project built and passed checks in `/tmp`, outside the game folder, demonstrating no dependency on the Swift project or source artwork directories.
- The copied project was tested with isolated fixture configuration in `available` mode: App Store CTA, canonical/social metadata, sitemap and completed release check passed. Fixture names, domain and email were not copied into the deliverable.
- Original configuration remains `coming-soon`, with blank publisher/contact/domain values as requested. `check:release` correctly reports these outstanding fields and the content-review flag.
- All website artwork and font files are hosted locally. The public source assets total approximately 2.2 MB, including artwork for all pages; the whole built site is approximately 2.9 MB. This is not a measured page-load or Lighthouse score.

## Screenshots

- `screenshots/desktop-home.png` — 1280 × 800 browser viewport.
- `screenshots/mobile-home.png` — 390 × 844 browser viewport.

## Publication handoff

The website has not been deployed to Vercel. The publisher, support email, domain, final policy review (including the proposed support-message retention practice), and live App Store URL remain owner-supplied details. A reviewed coming-soon website does not require an App Store URL; an available-app website does.

The site's accessibility work includes semantic headings with image alternatives, keyboard-operable native FAQ disclosures, visible focus, a skip link, contrast-conscious colours, responsive controls and reduced-motion support. It has not received an independent accessibility audit or a full physical-device/Safari test matrix.

The game's own release gates remain separate. After deployment, the final `/privacy` and `/support` URLs must be added to App Store Connect and the app's grown-up area. No app code, purchase configuration or release status was changed by this website work.
