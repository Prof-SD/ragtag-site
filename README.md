# Ragtag website

A separate, self-contained static website for the Ragtag iPhone/iPad game. It has its own build configuration, artwork, font and content. It does not import or modify the iOS project and can be moved into a new repository unchanged.

Repository: https://github.com/Prof-SD/ragtag-site

## Run locally

Use Node.js 22 or later. There are no npm dependencies to install.

```sh
git clone https://github.com/Prof-SD/ragtag-site.git
cd ragtag-site
npm run dev
```

Open http://127.0.0.1:4173. After editing source or configuration, run `npm run build` and refresh. `npm run preview -- --port 4174` selects another port.

```sh
npm run build
npm run check
```

## Deploy to Vercel

1. Import **Prof-SD/ragtag-site** in Vercel. Use the repository root as the Root Directory; the website is already at the top level of this repository.
2. Framework Preset: **Other**. Build Command: **npm run build**. Output Directory: **dist**. Node.js: **22.x or later**.
3. Deploy. `vercel.json` configures those settings, clean URLs, asset caching and security headers. No environment variables, server functions, database, npm packages or secrets are required.
4. Connect your domain and add its HTTPS origin to `site.config.json`, then rebuild.

Vercel CLI is also supported: run `vercel` from this directory after signing in. Deployment has not been performed by this project setup.

Official reference: https://vercel.com/docs/project-configuration/vercel-json

## Website details and launch switch

The confirmed website is **https://playragtag.xyz** and the public support email is **hi@playragtag.xyz**, configured in **site.config.json**. The publisher name remains temporary, and the App Store URL will be added when available. The site remains in coming-soon mode pending final publication review.

| Field | What to put here |
| --- | --- |
| `publisherName` | The confirmed public publishing entity/name |
| `supportEmail` | A real, monitored public support inbox |
| `siteUrl` | Your HTTPS origin, e.g. the actual custom domain, without a path |
| `appStoreUrl` | The real `https://apps.apple.com/...` product page when available |
| `launchStatus` | Leave `coming-soon` until the app is live; then use `available` |
| `policyDate` | Date the final policy was reviewed, YYYY-MM-DD |
| `supportRetentionDays` | Proposed support-message retention: currently 90 days after resolution; confirm this operating policy |
| `contentReviewed` | Set to true once publisher details, product claims, privacy policy, support process and hosting configuration are reviewed |

`contentReviewed: false` marks the privacy page as a draft and emits `noindex, nofollow` and a disallow-all robots file. This discourages indexing; it is not access control. Use Vercel preview protection if you need a private preview.

Once final details are supplied, run:

```sh
npm run build
npm run check:release
```

This intentionally fails while required public identity/contact/domain details are missing. A coming-soon website can pass without an App Store link. Available-app mode requires a real App Store URL, automatically changes the availability wording and enables the download CTA. With a reviewed domain, canonical/social tags and sitemap are generated.

## Pages and App Store URLs

- `/` — illustrated marketing page, real game screenshots, interactive world selector, free/paid comparison and FAQs.
- `/grown-ups` — purchase details, accessibility options, difficulty, kindness, devices and save behaviour.
- `/support` — practical support, current Toss/context controls, peaches, restoration, troubleshooting and contact.
- `/privacy` — game saves, Apple processing, family controls, hosting requests and support messages.
- `/404` — a friendly missing-page screen (Vercel uses the built `404.html`).

After deployment, use **https://playragtag.xyz/support** for the App Store Support URL and **https://playragtag.xyz/privacy** for the Privacy Policy URL. The iOS app still needs its own in-app privacy/support links updated after the URLs are live; this website does not change the app.

## Content and privacy notes

The website matches the locally implemented game: six free main stages; one optional permanent pack with 24 more main stages and seven Toybox Trails; no subscription or paid lives. The unconfirmed development price is deliberately not advertised. Family Sharing is qualified and should be verified in App Store Connect. The game itself remains pre-release.

The website has no third-party scripts, hosted embeds, analytics, tracking cookies, form submissions or browser storage. Nunito is self-hosted under the included SIL Open Font License. Vercel still processes infrastructure requests; the privacy policy states that separately from the game's local saves. The draft proposes a 90-day support-message retention practice, which the publisher must confirm and implement. Review the notice if hosting, analytics, email handling or game data flows change.

## Editing

- `src/pages.mjs` — page copy and layouts.
- `src/site.mjs` — shared navigation, footer, metadata and content helpers.
- `src/lettering.mjs` — original path-based heading artwork; no font is used for illustrated headings.
- `public/styles.css` — responsive styles and reduced-motion support.
- `public/site.js` — optional gallery/world interactions. Content remains available without JavaScript.
- `public/assets` — optimized local WebP artwork, screenshots, icons and social image.
- `docs/asset-provenance.json` — exact source game assets/captures and hashes.
- `docs/verification.md` — performed checks and remaining publication details.

The source images have only been resized, reoriented according to screenshot EXIF metadata and transcoded for the web. Website illustrations are clearly distinct from real in-game screenshots. The garden screenshot is from build 21; gameplay/sharing captures are from build 22. Newer final release captures can replace them before launch.

No app code or app project settings were changed. Assets belong to the game project; the Nunito font retains its separate open license. This is not a blanket open-source license for the game's art.
