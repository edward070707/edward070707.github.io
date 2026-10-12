# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: recruiters and companies deciding whether to interview Edward for a job or internship. They arrive from a CV, LinkedIn or a direct link, skim fast, and need to understand in seconds what he builds, with which technologies, and how to reach him. Secondary (unconfirmed weight): people arriving for his apps.

## Product Purpose
Personal portfolio of Edward Attuati, from the Bergamo area (Romano di Lombardia), Computer Engineering student at Università degli Studi di Brescia and mobile & web developer (Flutter, Firebase, iOS/Android, web). Success: a recruiter leaves convinced he ships real products and contacts him.

## Positioning
A student who designs and ships complete apps end to end (Chrono, Memive, Scadoo), not exercises. The site itself is a demonstration of craft: interaction details and easter eggs are part of the pitch.

## Capabilities and Constraints
- Static site on GitHub Pages, custom domain edwardattuati.com, Jekyll active (folders starting with `_` are not published). No build step: plain HTML/CSS/JS per page.
- Pages: index (home), aboutme, cv, chrono, chrono-app, memive, scadoo, scadoo-privacy (App Store requirement, must stay reachable), sitemap, plus `app/` (Flutter web build). vision.html (an older homepage concept) moved to `_archive/`.
- Every page except scadoo-privacy is translated into 5 languages (it, en, es, zh, ja); language choice is shared through localStorage `ea-lang`.
- Must keep: interactive atom in the hero, easter eggs (Konami code, 20 clicks on the atom), multilingual greeting + typewriter, custom cursor, CV intro (paper shatter, "Cambiamo le regole").
- Must remove: the chatbot, and the cookie banner (the site sets no tracking cookies; language lives in localStorage).
- Memive web app is live at /app/ (Flutter web build). Unused HTML5 UP template scripts (jQuery etc.) are removal candidates.
- GitHub section must show real data from the GitHub API, never invented numbers.
- Canonical contact email: edwardattuati@icloud.com (confirmed). Replace edward.attuati@gmail.com and eduattu@gmail.com everywhere.

## Brand Commitments
- Name "Edward Attuati", monogram "EA".
- User-pinned visual constraints for the redesign: a more human, less "AI-looking" palette replacing the current violet/cyan/pink; buttons in a liquid glass material.

## Evidence on Hand
- Projects: Blackjack Web (first project, high school), Chrono (time capsule, Flutter/Firebase, iOS/Android/Web), Memive (voice-only social, in development), Scadoo (pantry manager, Flutter/SQLite/Open Food Facts, in development).
- Timeline: Liceo Don Milani (2015), Università di Brescia (2020), Unity Junior Programmer (2021), Soluzione1 IT internship (2024), ALLTUB ITALIA IT Dept. (2025).
- Profiles: github.com/edward070707, LinkedIn, Instagram.
- GitHub reality: 1 public repository, 0 stars, 0 forks. Do not fabricate stats, testimonials, clients or metrics.

- Languages spoken (from the old About page): Italian native, English B2 certified, Spanish B2, Chinese intermediate, Japanese beginner.

## Product Principles
- Truth over shine: every number and claim on the site must be verifiable.
- Fast to skim: a recruiter gets who, what and how-to-contact in the first viewport.
- Craft is the proof: interactions show skill, but never block reading or contact.
- One identity across all pages.
- Release status (confirmed by Edward, 2026-10-12): no app is published on any store; Memive, Chrono and Scadoo are all in development. Memive has a web beta at /app/, Chrono a web demo at /chrono-app.html. Never write "available", "live" or "online" for the apps; planned prices are labelled as planned.
