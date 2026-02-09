# vaughan.codes — Web Portfolio

A terminal-themed personal portfolio website built with React, TypeScript, and Vite. The site mimics a macOS terminal window with draggable/minimize/maximize interactions and tabbed navigation across professional sections.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- Inline CSS-in-JS styling (no framework)
- JetBrains Mono font
- Docker + Nginx for production deployment

## Running Locally

```bash
npm install
npm run dev
```

## Production (Docker)

```bash
docker compose up --build
```

The site will be available at `http://localhost:8411`.

## Project Structure

```
src/
├── components/       # React components (tabs, terminal chrome, footer)
├── App.tsx           # Main app with window interactions
├── data.ts           # All portfolio content and types
├── theme.ts          # Color theme definitions
├── index.css         # Global styles
└── main.tsx          # Entry point
```

## Tabs

- **About** — ASCII art banner, role, location, bio
- **Experience** — Work history timeline
- **Projects** — Featured projects with tech tags
- **Skills** — Categorized skill groups
- **Education** — Degree and focus area
- **Contact** — Email, phone, links
