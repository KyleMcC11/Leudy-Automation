# GitHub Pages preview — setup

This folder is the Leudy Automation Group site, prepared ONLY as a
GitHub Pages preview for Ben to look at. It is not the real launch
build: its `vite.config.js` uses base `/leudy-automation-group/`
because a project site lives under that subpath, and GitHub Pages
cannot run the contact/book email functions (see "What won't work"
below). For the real launch on LeudyAutomationGroup.com, use the
`leudy-automation-group-website-v2.zip` build instead (base `/`,
Cloudflare Pages).

## Steps

1. On GitHub, create a **new public repository** named exactly:
   `leudy-automation-group`
   (Public matters: on the free plan, Pages only works for public
   repositories. The name matters: if the repo is named anything else,
   the site's asset paths break and the page loads blank — tell Kyle
   the new name and he will reissue this package with the base fixed.)
   Leave "Add a README" unchecked so the repo starts empty.
2. Unzip this package, open a terminal in the folder, and run:

   ```bash
   git init -b main
   git add .
   git commit -m "Leudy Automation Group preview"
   git remote add origin https://github.com/KyleMcC11/leudy-automation-group.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages → Build and
   deployment → Source** and choose **GitHub Actions** (not "Deploy
   from a branch").
4. Watch the **Actions** tab until the "Deploy to GitHub Pages" run
   goes green. If you pushed before choosing GitHub Actions as the
   source, re-run it from Actions → "Deploy to GitHub Pages" →
   "Run workflow".
5. Open: https://kylemcc11.github.io/leudy-automation-group/

## What won't work on this preview (expected)

- The contact and Book forms will show a not-connected/error message.
  GitHub Pages serves static files only — it cannot run the
  Cloudflare functions that send the emails. That is the same
  behaviour as running the site locally, and it does not mean the
  forms are broken. Email delivery only works after the Cloudflare
  deployment described in README.md.
- The Bookings calendar in step 5 will not appear, because Ben has
  not supplied a Bookings link yet. The page explains that Ben will
  follow up instead.

## Your other sites are untouched

Each repository gets its own Pages site. Creating
`leudy-automation-group` does not change, replace, or take down any
other repository's site (for example sticksup-hockey or Chess-Game).
Only reusing the exact same repository name — or the special
`KyleMcC11.github.io` user-site repository — would replace a site,
and this setup does neither.
