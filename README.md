# StreamGuard — Live Wall

A full-screen live **stream wall** for Minecraft server communities, and the
companion site for the StreamGuard Paper/Spigot plugin. The plugin tracks which
players are live on Twitch and YouTube; this site turns that feed into a
broadcast-style multiviewer.

The entire viewport is the product. No navbar, no sidebar, no marketing
sections — every live streamer is a monitor on a gap-free wall. Click a monitor
to open it fullscreen; when nobody is live, the wall shows a broadcast
"no signal" test card.

## Design concept — "The Gallery"

The visual language is a broadcast control-room multiviewer: a graphite surround
(the colour of a real monitor rack), **tally red** as the one loud colour for
on-air/live status, and **UMD amber** for channel numbers and data, after the
under-monitor displays on a video wall. Channel numbering is meaningful here —
multiviewer inputs are genuinely numbered. The signature element is the
SMPTE-style colour-bars empty state.

Type pairs **Oswald** (condensed broadcast gothic) for display, **Geist Mono**
for telemetry/UMD labels, and **Geist** for the sparse body copy.

## Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui primitives under `src/components/ui`, project wrappers under
  `src/components/app`
- `@/` import alias, `cn` in `src/lib/utils.ts`
- Theme tokens live in CSS (`src/theme/tokens.css`) — there is **no public
  runtime config file**. Customize by editing the tokens, the shadcn primitives,
  or the Tailwind classes.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server
npm run check    # lint, typecheck, test, architecture check, and build
npm run build    # typecheck (tsc -b) + production build
npm run preview  # preview the production build
npm run typecheck
```

## Quality gates

- `npm run lint` runs Biome, matching the broader Polity toolchain.
- `npm run test:run` covers the pure feed, embed, and wall-layout contracts.
- `npm run check:architecture` keeps API, UI primitive, app wrapper, theme, and
  page boundaries from drifting into each other.
- `npm run check` runs the full local release gate.

## How it works

### The feed

`src/api/live-feed.ts` defines the framework-free domain model (`LiveFeed`,
`LiveStreamer`, `StreamEmbed`) and a `LiveFeedClient` that fetches and normalizes
`/api/live`. It tolerates loosely-typed JSON from the plugin and infers embed
metadata when it isn't explicit.

In development, if the endpoint is unreachable, the client falls back to a
realistic local demo feed (`src/pages/stream-wall/demo-feed.ts`) so the UI is
always inspectable. Production never silently shows demo data.

`src/pages/stream-wall/use-live-feed.ts` is the React binding — it polls the
feed and exposes a manual refresh.

### Layout

`src/pages/stream-wall/stream-layout.ts` is pure, React-free packing math: given
a stream count and the viewport aspect ratio, it picks the column/row grid that
keeps tiles closest to 16:9, then distributes any partial final row so the grid
fills the viewport edge-to-edge with **no gaps** (e.g. 3 sources render as two
on top and one full-width below). It's isolated from rendering so the packing
behavior is easy to reason about and test.

### Embeds

`src/api/embeds.ts` holds the provider-specific embed logic, isolated from React.

- **Twitch** player iframes require a `parent` host. Rather than expose a runtime
  config file, the parent hosts are derived from `window.location.hostname` at
  call time, with a source-level fallback list (`TWITCH_PARENT_FALLBACK_HOSTS`).
  Add your production domain there if you ever serve the wall somewhere the
  runtime hostname can't be detected.
- **YouTube** embeds support a direct video id or a channel `live_stream` player.
  When only a channel is known with no embeddable id, the fullscreen view
  degrades to a clear provider link instead of a broken frame.

Video is never proxied — iframes point straight at the provider.

### Tiles only load the player when opened

The wall renders the "source" treatment first (provider thumbnail, or a
generated screen surface with a monogram when no thumbnail is present — no stock
imagery). Each tile carries a tally light, channel number, provider mark, and an
under-monitor display with the player name; title and viewer stats reveal on
hover/focus. Only when a monitor is opened does the real Twitch/YouTube iframe
load.

## Accessibility & responsiveness

- Tiles are real buttons: open with click / Enter / Space; `Escape` returns to
  the wall, and focus is restored to the originating monitor.
- Icon-only floating controls have `aria-label`s and tooltips.
- The grid reflows from a single full-screen monitor up to a balanced many-up
  wall, and collapses to a single stacked column in portrait / on mobile.
- Visible keyboard focus rings; safe-area insets respected for notched displays.

## Connecting the real plugin

Serve the StreamGuard plugin's feed at `/api/live` (same origin, or proxy it in
`vite.config.ts` for local development). Expected shape:

```jsonc
{
  "updatedAt": "2026-06-26T12:00:00Z",
  "streamers": [
    {
      "playerName": "RedstoneRhea",
      "provider": "twitch",            // "twitch" | "youtube"
      "channel": "redstonerhea",
      "url": "https://twitch.tv/redstonerhea",
      "title": "Building a trading hall",
      "thumbnailUrl": "https://…",      // optional
      "viewerCount": 1284,              // optional
      "liveSince": "2026-06-26T10:24:00Z", // optional
      "embed": { "kind": "twitch", "channel": "redstonerhea" }
    }
  ]
}
```

`embed` is optional — the client infers it from `provider`/`channel`/`url` when
omitted.

## License

GPL-3.0-only. See `LICENSE`.
