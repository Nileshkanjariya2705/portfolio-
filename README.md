# Nilesh Kanjariya — Developer & Product Partner

A client-focused portfolio built with **Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion, and Lucide**. The design uses white, navy, blue, locally hosted fonts, and original code-based illustrations. No headshot, fabricated client testimonials, invented results, or unprovided GitHub links are included.

## Run locally

Use Node.js 20.9 or later (Node.js 24 was used for validation).

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://127.0.0.1:3000`. To make a production build:

```powershell
npm.cmd run build
npm.cmd start
```

The server stays on the local computer. To test from another device, explicitly change the hostname in the package script to `0.0.0.0` and use your computer's local-network address.

## Included

- Homepage with eight services, four filterable projects, technical skills, an about section, a six-step process, and inquiry form. The mobile toolkit ribbon stays on one horizontally scrollable row, with keyboard support.
- Four statically generated, individually addressable case-study pages.
- Responsive mobile navigation, keyboard focus styles, a skip link, reduced-motion support, and content visible without JavaScript.
- A coordinated motion system: staged headline entrances, drawn underline, scroll reveals, pointer-responsive artwork, animated data connectors and orbits, spring-based project filters, card interactions, scroll progress, and a back-to-top control. The pause/resume button in the bottom-right saves your preference locally and follows device reduced-motion settings. Continuous decorative animations stay off without JavaScript.
- A real, locally stored screenshot of Shred Himalayas, captured from its public website. Brainros rejected automated capture with HTTP 403; it and the two projects without public links use **explicitly labeled interface concepts**. Replace these with approved screenshots when available.
- Metadata, canonical URLs, Person structured data, generated social-sharing image, favicon, sitemap, robots.txt, privacy page, and custom 404.
- Validated contact API, honeypot, timing checks, origin checks, payload limits, best-effort per-instance request throttling, and clear delivery/error/draft states.
- No database, account system, paid assets, or analytics dependency.

## Activate direct email delivery

Copy `.env.example` to `.env.local`. Configure these values locally and in Vercel's environment settings:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-real-project.vercel.app
RESEND_API_KEY=your-server-only-resend-api-key
CONTACT_FROM_EMAIL=Portfolio <inquiries@your-verified-sender-domain.com>
```

The API sends inquiries to **nileshkanjariya2705@gmail.com** and sets the visitor's address as `reply_to`. The sender must be allowed by your Resend account. A verified sending domain is required for unrestricted production sending; follow [Resend's sender setup](https://resend.com/docs/dashboard/domains/introduction). Use [Resend's send-email API documentation](https://resend.com/docs/api-reference/emails/send-email) when changing the integration. Credentials are server-only and are never sent to visitors.

Without these credentials, the form validates the inquiry and provides an **Open inquiry in email app** button with a pre-filled draft. It explicitly says the inquiry has **not** been sent. No inquiry is stored in a database. This fallback is usable now, but direct delivery and actual inbox receipt still require configuration and a real end-to-end sending check.

The in-memory rate limit is a best-effort layer and does not persist across serverless instances or restarts. Before exposing the form broadly, configure a deployment-level rate limit with Vercel Firewall or an equivalent service. Honeypot and timing checks remain active without an external service.

## Publish on Vercel

This is a standard Next.js project; no Sites or alternative framework runtime is required.

1. Put **this folder** in a GitHub repository and import it into Vercel. If you use a parent repository, set the Vercel **Root Directory** to `nilesh-portfolio`.
2. Keep the Next.js framework preset and default build command (`npm run build`). Do not set a custom static output directory; the contact API needs the Next.js server runtime.
3. Add the environment variables above. Use the actual production URL for `NEXT_PUBLIC_SITE_URL`, then redeploy so canonical URLs, the sitemap, and social links match your domain. When this variable is absent, the app also recognizes Vercel's production URL variable.
4. Check the homepage, a case study, the social preview, and a real inquiry on the deployed site. Confirm the inquiry arrives in the inbox and Reply targets the visitor.

Alternatively, from this directory run `npx vercel` and follow Vercel's sign-in and deployment prompts. Publishing requires access to your Vercel account. No public deployment was created during local implementation.

## Edit content

- `src/lib/content.ts`: personal details, projects, services, skills, development process.
- `src/app/page.tsx`: homepage sections and biography.
- `src/app/globals.css`: component foundations and illustrative artwork.
- `src/app/design.css`: the refined NK identity, readable typography, cards, navigation, and responsive design.
- `src/app/animations.css`: entrance sequences, ambient artwork, hover effects, and motion preference overrides.
- `src/components/motion-provider.tsx`: shared motion settings, pause/resume, reading progress, and back-to-top controls.
- `src/lib/inquiry.ts`: form choices and shared validation.
- `src/app/api/contact/route.ts`: email delivery and server validation.
- `public/projects/`: approved project captures. For an actual screenshot, set a project's `image` and `imageAlt` in `content.ts`.

Shred Himalayas' technology stack remains **to be confirmed**, as specified in the brief. Education, credentials, and the eSparkBiz employment block have been removed from the homepage as requested.

## Checks

With the development server running and email credentials **unset**, run:

```powershell
npm.cmd run typecheck
npm.cmd run test:contact
npm.cmd run test:e2e
```

Browser tests use an installed Google Chrome. If Chrome is unavailable, install Playwright Chromium with `npx playwright install chromium` and remove `channel: "chrome"` from `playwright.config.ts`. `TEST_BASE_URL` can target another local server. Do not run the missing-provider tests against a live email configuration.

The browser suite covers navigation, filters, all case studies, mobile navigation, validation, real API rejection/throttling and missing-configuration behavior, simulated success/error UI, no-JavaScript content, responsive overflow, and automated WCAG checks. Dedicated motion tests run with animations enabled, then check pause persistence, resume, device reduced-motion settings, artwork movement, reveals, animated filtering, and mobile navigation. The separate API integration suite intercepts provider traffic to check the actual request payload and provider-success/failure paths without sending emails.

Screenshots and machine-readable results are in `verification/`. Automated accessibility checks are useful evidence, not a substitute for a full manual accessibility audit. No deployed Core Web Vitals field data or real inbox delivery is claimed.

## Fonts and images

Inter (body text) and Plus Jakarta Sans (headings and NK identity) are self-hosted under the SIL Open Font License. Their license files are included in `public/fonts/`. The project screenshot comes from the user's supplied project website. The remaining artwork is original CSS/SVG and explicitly labeled interface illustration.
