# Run the Site Locally

Run StreamGuard Site against a local plugin feed or its development-only demo
feed.

## Steps

1. Install Node.js 24 and npm 11.6.2.
2. Install dependencies with `npm ci`.
3. Start StreamGuard's HTTP feed on `http://127.0.0.1:8127`, if available.
4. Start the site with `npm run dev`.
5. Open the local URL printed by Vite.

Vite proxies `/api/live` to the local plugin endpoint. If that endpoint is
unavailable, the development build uses a demo feed so the wall remains
inspectable.

## Verification

Run `npm run check`. The command must complete Biome, typed ESLint, TypeScript,
Vitest, architecture checks, and the production build without errors.

## Notes

- Production builds do not use the demo feed.
- Use `npm run build` followed by `npm run preview` to inspect production output.
