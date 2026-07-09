# Inventyfie

Inventyfie is a React 19 + TypeScript + Vite 6 web application built as an AI Engineering Research Platform. The project focuses on practical engineering research content including investigations, benchmarks, case studies, decision frameworks, and resources.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS
- Motion (Framer Motion runtime package)
- Lucide React

## Local Setup

Prerequisites:
- Node.js 20+
- npm 10+

Install dependencies:

npm install

Create a local environment file:

- Copy .env.example to .env.local
- Update values as needed for your machine

Run development server:

npm run dev

## Build and Preview

Create production build:

npm run build

Preview production build locally:

npm run preview

Type-check project:

npm run lint

## Environment Variables

This project uses Vite environment variables. Use the VITE_ prefix.

Current variables:
- VITE_SITE_URL
- VITE_DISABLE_HMR

Example values are documented in .env.example.

## Azure Static Web Apps Deployment Notes

This repository is ready for Azure Static Web Apps deployment.

Key files:
- staticwebapp.config.json for SPA fallback and headers
- vite.config.ts outputs build artifacts to dist

Recommended Azure Static Web Apps build settings:
- App location: /
- API location: (leave empty unless adding an Azure Functions API)
- Output location: dist
- Build command: npm run build

For GitHub Actions based deployment:
1. Push this project to GitHub.
2. Create an Azure Static Web App resource.
3. Connect the GitHub repository and branch.
4. Confirm output location is dist.
5. Let Azure generate the deployment workflow.

## Folder Structure

.
- public/
  - favicon.svg
  - robots.txt
  - sitemap.xml
  - rss.xml
- src/
  - components/
  - contexts/
  - data/
  - lib/
  - App.tsx
  - main.tsx
  - index.css
- index.html
- package.json
- tsconfig.json
- vite.config.ts
- staticwebapp.config.json
- .env.example

## Notes

- UI design, theme system, animation behavior, and component styling were intentionally preserved.
- Project-readiness cleanup focuses on deployment safety, environment handling, and documentation.
