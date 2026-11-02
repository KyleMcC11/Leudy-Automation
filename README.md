# Leudy Automation Group — Website

Build: `leudy-automation-group-website-v2` (2026-11-02). If a later zip
arrives with a different version in this line, use that one — do not trust
a download that reports an older folder as up to date.

v2 is a layout reshape of v1 (same content, same forms, same Cloudflare
setup), following the structure of Snowden Consulting and 24WEB without
copying their words: hero with a remote/focus-USA eyebrow and the
one-senior-consultant pitch, then a problem checklist section, then the
ROI calculator up near the top as the "what it's costing you" step,
then Services, then Work in Problem / Action / Result form, then
testimonials as one large single column, then About with a direct-help
bullet list, then Book and Contact. Every heading and sentence is still
from Ben's requirements document; only the order, the section shapes,
and the "Action" label are borrowed.

This build replaces the earlier PowerShell-contracting site (v1–v3). It is
built on top of that site's design — flat, left-aligned, minimalist,
large plain headlines, first-person character — and rebuilt around Ben
Leudy's requirements document for Leudy Automation Group (November 2,
2026). The document allowed a one-page site with its pages as sections
instead of separate pages, which is what this is: Home, Services, Work,
Testimonials, About, ROI calculator, Book (project intake), Contact,
Resources, and Privacy, all on one page with smooth-scroll navigation.

Built from the stock Vite + React starter (its template demo page has
been replaced; its Vite setup, `package.json`, and `vite.config.js` are
unchanged).

## What is in here, from the requirements document

- **Home:** headline from the document ("Custom apps and automation for
  teams already on Microsoft 365"), a plain-language intro, the three
  offers, and a "Book a free process audit" button above the fold.
- **Services:** the 4-step "How it works" strip (free audit, Discovery
  Sprint, Build, Support retainer), then every offer with what is
  included and its timeline — Discovery Sprint, Build Starter / Workflow
  Suite / Enterprise, Support Essentials / Growth / Partner — followed
  by "Every build includes", add-ons (names only), and the "What we
  build" list grouped under Build and migrate, Data and AI, and Support
  and governance. **No prices, payment terms, or discounts anywhere.**
  One deliberate omission: the document's Discovery Sprint text also
  said the Discovery fee is credited toward a build signed within 30
  days. That is a commercial term, so it is left off the site under the
  document's own no-prices rule — Ben can confirm if he wants it shown.
- **Work:** the three case studies, results first, client named only as
  "DND Health Services departments" — J1 requests workflow (30 days to
  5, 500+ users), ATI and RFI request tracking, clinic patient referral
  (rolling out to 33 clinics). The "10+ hours saved per person per
  week" figure is shown only in the overall results strip, because the
  document lists it without tying it to one case. No screenshots are
  shown: Ben supplies real screenshots with fake or blurred data.
- **Testimonials:** all ten approved quotes, first names only, each
  credited "DND Health Services".
- **About:** Ben's bio (short lead + long version, first person),
  experience list, and the honest certification line — "Currently
  pursuing Microsoft Power Platform certification (PL-200 is the first
  target)" — plus the held B.Eng and PMP. The bio is kept as Ben wrote
  it, including "33 Canadian Armed Forces clinics across Canada"; the
  case studies themselves stay anonymised to "33 clinics". A headshot
  placeholder note stands in for the photo Ben still has to supply.
- **ROI calculator:** hours per week × hourly cost × 52, labelled a
  conversation starter, not a quote. It shows savings, never a service
  price.
- **Book (project intake):** the full 4-step questionnaire from the
  document, with a progress bar, Back/Next, inline validation, answers
  saved in the visitor's browser so a refresh does not lose them, the
  "don't include passwords, patient data, or other personal
  information" warning, a honeypot, and a "What happens next" side
  panel. Step 5 is the Microsoft Bookings calendar (see below).
- **Contact:** a "Start your free process audit" button to the intake
  section, plus a short general-enquiry form (name, email, company,
  "What do you want to automate?").
- **Resources:** a coming-soon section only, per the document's
  "no posts needed at launch" — the blog is nice-to-have.
- **Privacy:** a simple policy covering the forms and the browser
  draft, and stating that no analytics tool is configured yet.
- **Branding (proposed, for Ben to approve):** a plain-text wordmark
  ("Leudy Automation Group", shortened to "LAG" on phones) — no icon
  box — in `public/logo.svg`, plus a matching favicon. Colours:
  navy #0F172A and blue #2563EB from the earlier site, with a warm
  amber accent (#F59E0B) used only for Book buttons. The warm accent is
  the document's "[A]" suggestion, so Ben should confirm it. One clean
  sans-serif (Inter) throughout. No stock photos of robots or gears,
  and no photos at all until Ben supplies real ones.
- **SEO:** title and meta description, Open Graph tags, canonical URL,
  `public/sitemap.xml`, `public/robots.txt`, and ProfessionalService
  schema in `index.html`. The domain in those files is
  www.LeudyAutomationGroup.com, which the document says Ben buys and
  owns — it is not yet a live domain in this build.
- **Mobile:** fully responsive, plus the pinned "Book a free process
  audit" bar at the bottom of the screen on phones, as in the
  document's phone mockup.

## Before you go live — fill these in

Nothing on the site invents contact details. All of these live in
`src/config.js` (or Cloudflare env vars) and are left empty until Ben
confirms them:

1. **`src/config.js`**
   - `EMAIL` — professional email on the domain. The document gives
     "ben@LeudyAutomationGroup.com" only as an example, so it is NOT
     used here. Empty means no email row is rendered.
   - `LINKEDIN_URL` — full LinkedIn profile URL. Same rule.
   - `BOOKINGS_URL` — Microsoft Bookings page for the 30-minute
     process audit. While it is empty, step 5 of the intake explains
     that the calendar will appear once the link is added and that Ben
     will follow up on the answers sent — which matches the document's
     rule that a visitor who leaves before picking a time still leaves
     Ben with their answers.
2. **Headshot** for the About page (the one item the document says is
   still to come from Ben).
3. **Real screenshots** for Work, with fake or blurred data only.
4. **Analytics provider** (Plausible, Cloudflare Web Analytics, or
   GA4) — none is installed yet, and the privacy policy says so.
5. **Brand accent** — confirm the amber Book-button colour (above).
6. **Industry dropdown** in the intake (Book step 1) uses a short list
   of common sectors plus "Other" — the document only specified a
   dropdown with "Other", so Ben can adjust the list.

## How the intake form connects (Book)

The document's full flow is: answers post to a Power Automate flow
(HTTP trigger) in Ben's own tenant, which emails Ben a summary, saves
the submission to a SharePoint list, and emails the visitor a copy;
Bookings then handles the calendar. `functions/api/book.js` implements
that in stages:

1. If `POWER_AUTOMATE_URL` is set in Cloudflare env vars, answers are
   forwarded to Ben's flow (which owns SharePoint, the visitor copy,
   and any Teams alert). Nothing is stored on the developer's accounts.
2. Otherwise, if `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set, Ben is
   emailed a formatted summary (subject: "New process audit: [Company]
   – [process name]") and the visitor is emailed a copy. SharePoint /
   Teams steps wait for stage 1.
3. If neither is set, the function returns HTTP 501 and the form says
   so plainly, with answers still saved in the visitor's browser —
   instead of pretending the answers were sent.

Fallback from the document, if the Power Automate connection cannot be
made: embed a Microsoft Form for steps 1–4 with a flow on new
responses, which Ben can build himself. That is not built here because
no form link exists yet.

The general-enquiry contact form posts to `functions/api/contact.js`
(Resend, same env vars) and has the same honest 501 behaviour. Its
logic was unit-tested earlier: invalid input → 400, honeypot → 200
(silent discard), valid but env vars unset → 501.

## One gap vs the document, stated plainly

The document requires Ben to be able to edit text, images, case
studies, and testimonials without code (Webflow/Framer/WordPress, or a
static site with a headless CMS). This React build does not meet that
yet: editing means editing the component files (each section's content
sits in one data array at the top of its file, e.g. the offers in
`src/components/Services.jsx`, the cases in `Work.jsx`, the quotes in
`Testimonials.jsx`). If Ben needs no-code editing at launch, the next
step is either a headless CMS in front of this site or moving the
content to one of the document's suggested platforms — that is a
separate decision, not something to pretend this build already does.

Running cost stays within the document's target: Cloudflare Pages
hosting is free, Resend has a free tier, and no other paid service is
required. Accounts, domain, email, analytics, and booking accounts
must be registered under Ben's own email.

## Run it locally

```bash
npm install
npm run dev
```

Build (this is what Cloudflare runs):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Note: `npm run preview` serves only the static build — the
`/api/contact` and `/api/book` functions do not run there. Test forms
on the Cloudflare deployment, or with `wrangler pages dev` if you use
Wrangler locally.

## Deploy on Cloudflare Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to
   Git → select the repository.
3. Build settings:
   - Framework preset: **React (Vite)** (or leave unset and use the
     settings below)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
4. Deploy. Cloudflare gives you a `*.pages.dev` address for testing.
5. Every push to `main` redeploys automatically.
6. Connect the custom domain (Pages → Custom domains) before promoting
   the site publicly, then set up Google Search Console and a Google
   Business Profile as the document requires.

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx        ← wordmark + nav + Book a call
│   ├── Hero.jsx
│   ├── Services.jsx      ← offers, includes, add-ons, what we build
│   ├── HowItWorks.jsx    ← 4-step strip used by Services
│   ├── Work.jsx          ← case studies + results strip
│   ├── Testimonials.jsx  ← all 10 approved quotes
│   ├── About.jsx         ← bio, experience, certifications
│   ├── Roi.jsx           ← savings calculator
│   ├── Book.jsx          ← 4-step intake questionnaire + Bookings step
│   ├── Contact.jsx       ← intake link + general-enquiry form
│   ├── Resources.jsx     ← coming-soon section
│   ├── Privacy.jsx
│   └── Footer.jsx
├── styles/               ← one CSS file per section
├── config.js             ← business name, email, LinkedIn, Bookings URL
├── App.jsx
└── main.jsx
functions/
└── api/
    ├── contact.js        ← general-enquiry form (Resend)
    └── book.js           ← intake form (Power Automate, else Resend)
public/
├── logo.svg              ← proposed wordmark (SVG; export a PNG from it
│                           for proposals/invoices/LinkedIn)
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

No router is needed (single page), and there are no dependencies beyond
React itself — deliberately kept minimal so the site stays fast and
easy to maintain.
