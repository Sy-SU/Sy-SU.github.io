# Senyang Su — Personal Homepage

A compact academic homepage for Senyang Su, built with React and Vite. The site highlights education, selected awards, and the 3D Shape Tokenization reproduction project while keeping future research and contact sections data-driven.

## Local development

```bash
npm ci
npm run dev
```

Open <http://127.0.0.1:5173/>.

## Checks

```bash
npm test
npm run build
npm run preview
```

## Updating content

Edit `src/content.js`. Sections and navigation links are rendered only when their corresponding data is present, so research items and contact links can be added without changing the page structure.

The original portrait is retained at `images/profile.jpg`. The website uses the optimized derivative `images/profile-web.jpg`.

## Deployment

The included GitHub Pages workflow is manual-only. It does not publish on push. Repository creation, remote changes, and public deployment are intentionally outside the current setup.
