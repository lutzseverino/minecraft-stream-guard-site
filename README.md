<div align="center">
    <h1 align="center">StreamGuard Site</h1>
    <p>A fullscreen live stream wall for Minecraft survival communities using StreamGuard.</p>
    <p>
        <img alt="site" src="https://img.shields.io/badge/site-vite-111827">
        <img alt="frontend" src="https://img.shields.io/badge/frontend-react-1f2937">
        <img alt="ui" src="https://img.shields.io/badge/ui-shadcn-374151">
        <img alt="quality" src="https://img.shields.io/badge/quality-biome-4b5563">
        <img alt="license" src="https://img.shields.io/badge/license-GPL--3.0--only-6b7280">
    </p>
</div>

## Overview

StreamGuard Site is the companion live wall for the StreamGuard Paper/Spigot plugin. The plugin
publishes the players currently live on Twitch or YouTube; this site renders them as a fullscreen,
gap-free broadcast wall.

The viewport is the product: no navbar, no sidebar, and no marketing surface. Each live streamer is
a screen. Click a screen to open the provider embed fullscreen; when nobody is live, the wall shows a
broadcast-style no-signal state.

## Project

- `src/api/` contains the framework-free live feed and embed contracts.
- `src/components/ui/` contains generated shadcn/ui primitives. Keep these primitive and wrap them
  from `src/components/app/` when project styling or behavior is needed.
- `src/components/app/` contains StreamGuard-owned component wrappers and small app-level UI pieces.
- `src/pages/stream-wall/` contains the wall experience, page-local components, hooks, and layout
  math.
- `src/theme/` contains CSS theme tokens and the theme provider.

The visual language is a broadcast control-room multiviewer: graphite screens, tally red for live
state, UMD amber for channel data, and a SMPTE-style empty state. There is no public runtime theme
configuration layer; customize the site by editing tokens, wrappers, or page components.

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

## Quality Checks

```bash
npm run check
npm run lint
npm run typecheck
npm run test:run
npm run check:architecture
```

`npm run check` is the local release gate. It runs Biome, TypeScript, Vitest, dependency-cruiser,
and a production build.

The quality stack is layered by ownership:

- Formatting and linting: Biome for TypeScript, React, CSS, JSON, and config files.
- Correctness: TypeScript strict checks and focused Vitest coverage for feed, embed, and layout
  behavior.
- Architecture: dependency-cruiser keeps API, UI primitive, app wrapper, theme, and page boundaries
  from drifting into each other.
- Build verification: Vite production build with relative asset paths for simple static hosting.

## Plugin Feed

The site reads the StreamGuard plugin feed from `/api/live`. In development, `vite.config.ts`
proxies that path to `http://127.0.0.1:8127`. If the local plugin endpoint is unavailable, the
development build uses a demo feed so the wall remains inspectable. Production builds do not silently
show demo data.

Expected shape:

```jsonc
{
  "updatedAt": "2026-06-26T12:00:00Z",
  "streamers": [
    {
      "playerName": "RedstoneRhea",
      "provider": "twitch",
      "channel": "redstonerhea",
      "url": "https://twitch.tv/redstonerhea",
      "title": "Building a trading hall",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "viewerCount": 1284,
      "liveSince": "2026-06-26T10:24:00Z",
      "embed": { "kind": "twitch", "channel": "redstonerhea" }
    }
  ]
}
```

`embed` is optional. The client infers provider embed metadata from `provider`, `channel`, and `url`
when enough information is present.

## Documentation

- [License](LICENSE)
- [Source entrypoint](src/pages/stream-wall/stream-wall-page.tsx)
- [Feed client](src/api/live-feed.ts)
- [Layout model](src/pages/stream-wall/stream-layout.ts)
