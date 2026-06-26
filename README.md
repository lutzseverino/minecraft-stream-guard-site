<div align="center">
    <h1 align="center">StreamGuard Site</h1>
    <p>A fullscreen live stream wall for servers using the StreamGuard Minecraft plugin.</p>
    <p>
        <img alt="site" src="https://img.shields.io/badge/site-vite-111827">
        <img alt="frontend" src="https://img.shields.io/badge/frontend-react-1f2937">
        <img alt="ui" src="https://img.shields.io/badge/ui-shadcn-374151">
    </p>
</div>

## Overview

StreamGuard Site is a companion web surface for
[StreamGuard](https://github.com/lutzseverino/minecraft-stream-guard), a Paper/Spigot plugin that
checks whether survival players are live on Twitch or YouTube.

The site reads the plugin's live feed and turns the current streamers into a fullscreen broadcast
wall. Every live player becomes a screen; selecting a screen opens the Twitch or YouTube embed.

## Getting Started

Install dependencies from the project root:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Plugin Feed

The site reads `/api/live`, served by the
[StreamGuard plugin](https://github.com/lutzseverino/minecraft-stream-guard). In local development,
`vite.config.ts` proxies that path to `http://127.0.0.1:8127`.

When the plugin is not running, development builds use a demo feed so the wall remains inspectable.
Production builds expect the real plugin feed.

## Quality Checks

```bash
npm run check
npm run lint
npm run typecheck
npm run test:run
```

`npm run check` is the local release gate. It runs Biome, TypeScript, Vitest, dependency-cruiser,
and a production build.

## Links

- [Minecraft plugin](https://github.com/lutzseverino/minecraft-stream-guard)
- [Feed client](src/api/live-feed.ts)
- [Wall page](src/pages/stream-wall/stream-wall-page.tsx)
