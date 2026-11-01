# Verification — 30 October 2026

Validated against the local **production build**, served at `http://127.0.0.1:3000`.

| Check | Result |
| --- | --- |
| Next.js production build and TypeScript checks | Pass |
| Playwright browser tests | 14 passed |
| Contact provider integration tests | 3 passed; provider traffic intercepted, no email sent |
| Responsive layout | No horizontal overflow at 320, 390, 768, 1024, and 1440px |
| Browser runtime and hydration errors | None observed in final checks |
| Automated WCAG checks | Pass on homepage and property case study |
| Mobile Lighthouse performance | 96 |
| Mobile Lighthouse accessibility | 100 |
| Mobile Lighthouse best practices | 100 |
| Mobile Lighthouse SEO | 100 |
| Mobile Lighthouse LCP / CLS | 1.0 s / 0 |

The Lighthouse results are a local mobile lab run, not deployed field measurements or a guarantee of identical scores on every device. See `lighthouse-mobile.report.html` and `.json` for the full report; `test-results.json` contains the browser test results.

Desktop/mobile screenshots and contact/case-study captures were visually inspected. Shred Himalayas has a real public-site capture. Brainros returned HTTP 403 during capture; it and the two projects without public links use explicitly labeled illustrative interfaces.

**Remaining external setup:** Vercel account access to publish, the actual production URL, and a Resend API key plus allowed sender address for direct inquiry delivery. The validated email-draft fallback works without these credentials. Actual inbox delivery has not been tested. See `../README.md` for setup and deployment instructions.

## Readability redesign

Updated the uppercase NK identity in navigation, the hero, the About section, and the favicon. Added self-hosted Inter body text and Plus Jakarta Sans headings, larger paragraph and form text, a floating navigation bar with current-section highlighting, clearer project filters, softer cards, and a single-column form on mobile. The production build and all 10 browser tests passed after this update, including automated accessibility checks. Contact API implementation is unchanged from the previously verified integration tests.

## Animation update

Added staged hero entrances and underline drawing, coordinated scroll reveals, pointer-responsive artwork, animated orbits and data connections, spring-based project filtering, hover effects, reading progress, and back-to-top controls. A persistent pause/resume control follows device reduced-motion settings. Content stays readable with JavaScript disabled, and continuous decorative animations remain off in that mode. All 14 browser tests passed on the final production build, including four dedicated normal-motion, mobile, pause-persistence, and reduced-motion tests.

A real interaction recording is saved as nimation-demo.webm, with entrance, settled hero, project hover, and paused-state screenshots. The final mobile Lighthouse report uses normal device-motion settings. Email delivery configuration is unchanged.
