Contributor setup and maintenance guidance for StreamGuard Site.

## Setup and validation

Use Node.js 24 and npm 11.6.2. From the repository root, run `npm ci` and `npm run dev`. Run `npm run check` before review: it runs Biome, typed ESLint, TypeScript, Vitest, dependency-cruiser, documentation checks and the production build. `npm run build` creates `dist/`; `npm run preview` serves it locally. The required CI checks are Validate site and the pull request metadata checks.

The application currently uses npm, TypeScript 5 and Vitest 4. Migration to the optional typescript-vite stack is tracked separately in [#9](https://github.com/lutzseverino/minecraft-stream-guard-site/issues/9).

## Index

- [Architecture](architecture/README.md): Module boundaries and runtime behavior.
- [Templates](templates/README.md): Starting points for maintained documentation.
