# Andwe1n — Mihnea-Andrei Cristache

A personal portfolio in JavaScript, Svelte 5, Vite, and Three.js. It includes seven navigable pages, project case studies, an awards strip, and a separate visual studio for photography and editing work.

## Run

`npm install` then `npm run dev`. For production, `npm run build`; preview it with `npm run preview`.

## Portfolio content

Portfolio copy and project details live in **`src/content.js`**:

- `profile`: name, introduction, biography, goals, and contact details.
- `highlights`: awards shown on the homepage.
- `projects`: project case studies, including roles, contributions, outcomes, toolkits, and optional repository/live links.
- `skillGroups`, `services`, and `principles`: areas of experience and ways to collaborate.
- `socialLinks`: full profile destinations. Empty links show “Soon”; Gmail and WhatsApp can derive from `profile.email` and `profile.phone`.

For a CV, place your file in `public/` and set `profile.resumeUrl` to its public path, such as `/mihnea-cv.pdf`.

### Photos and case-study images

The visual studio in **`src/Photography.svelte`** displays your 16 photographs, grouped into Automotive, Details, and Moments. The featured carousel, masonry collection, and large image viewer preserve the photos’ proportions. Keyboard arrows, Home/End, mobile swipes, native dialog focus management, and Escape-to-close are supported. A photography preview also appears below the projects on the homepage.

Edit titles, descriptions, categories, and alt text in **`src/photography-data.js`**. The selected order opens with the studio GT3 RS photograph and alternates details and full scenes. Every source photo is included.

Original files remain in `public/images/Photography Projects/`. `scripts/prepare-photography.py` creates optimized thumbnail, display, and large-view WebP copies in `public/images/portfolio/`; it applies EXIF orientation, converts embedded profiles to sRGB, and omits metadata from public copies. Run it with Python + Pillow when adding or replacing source photos. Originals are kept out of deployments; only the web copies are published.

`src/ProjectCard.svelte` contains the abstract project covers. Add project images to a case study in `src/App.svelte` when available.

### Pages and contact behavior

Routes use hashes so they work on static hosting: `#/home`, `#/about`, `#/projects`, `#/skills`, `#/services`, `#/contact`, `#/other`, plus `#/projects/undefined` and `#/projects/nexus`.

The contact form validates the fields and prepares a message. With no email configured it previews/copies the message and sends nothing. With `profile.email` configured it opens the visitor's email app with a draft; the visitor sends it. This model does not have a form-delivery backend.

Edit layout in `src/App.svelte` and appearance in `src/style.css`. The blog remains optional and has not been added.

## Spotlight and liquid glass

The homepage uses the supplied Spotlight composition, including its pixel-based typography, breakpoint tokens, gradient text, two pill CTAs, and spring entry cascade. `src/spotlight.css` holds the reference measurements. `src/Spotlight.svelte` holds the hero copy. `src/SpotlightNav.svelte` adapts its five navigation positions to the portfolio; the Pages menu keeps every route available. Both CTAs open the contact page, with Book a call preselecting that subject.

`src/liquid-glass.css` contains the supplied Liquid Glass recipe with a clearer surface: 1.8–8.5% white fill, 12px blur, softer rims, and a lighter sheen. `src/glass.js` applies it to panels and controls on every route. Navigation links use plain text inside one outer glass bar, with a single subtle contact pill. Native form fields use glass wrappers so the sheen and rim pseudo-elements render. `src/glass-integration.css` handles layout, pill shapes, and positioned children. The nav menu is outside the clipped header surface.

The General Sans, Onest, and Playwrite US Trad fonts are stored locally in `src/assets/fonts` and loaded through `src/fonts.css`. Press R outside a form field to replay the reference spring entrance.

Local photo originals in `public/images/Photography Projects/` stay local. Their optimized web copies are now included in the visual studio and homepage preview.

## Storm background

The latest supplied Storm specification lives in `src/storm.js` and `src/storm-shaders.js`: Three.js 0.143.0, all five verbatim GLSL shaders, 50,000 storm particles, 430 camera-following motes, and the exact three-composer pipeline. Its final monochrome overrides include background #030303, blow-up 0.69, brightness 3.8, flame amount 2.4, spin 0.81, and atmosphere speed 2.5. It renders at device pixel ratio without a global tint or darkening overlay. Pause and reduced-motion preferences freeze time-based animation.
