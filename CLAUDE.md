# CLAUDE.md

Marketing site for Impulso Restaurantero. Next.js 15 Pages Router, static export, deployed to Vercel.

## Commands

- `npm run dev` — dev server, auto-picks free port starting at 3000 (`scripts/start.js`).
- `npm run build` — `next build`. Runs `next-sitemap` as postbuild.
- `npm run start` — alias for `dev` (the `start` script delegates to `npm run dev`, it does **not** serve a production build).

No test suite. No lint script. Don't add one without asking.

## Architecture — non-obvious

- `next.config.js` sets `output: "export"`. **The site is a static export.** No SSR at runtime, no API routes, no `getServerSideProps`, no middleware, no `revalidate` at request time. Use `getStaticProps` / `getStaticPaths` only.
- **Pages Router** (`pages/`), not App Router. No `app/`, no Server Components, no Server Actions.
- Dynamic content comes from two external APIs, both via `NEXT_PUBLIC_*` env vars (i.e. fetched at build time for static export, or client-side):
  - Blog: `NEXT_PUBLIC_BLOG_API` → Adonis service on Railway. See `lib/blogApi.js`.
  - Traspasos: `NEXT_PUBLIC_TRASPASOS_API` → local Adonis on port 53107. See `lib/traspasosApi.js`.
- UI stack is intentionally mixed: Tailwind + Ant Design + styled-components + emotion. **Don't introduce a fifth.** Don't migrate components between them without being asked.
- Legacy carousels coexist: `owl.carousel`, `flickity`, `swiper`. **Don't consolidate.** Match whatever the surrounding page uses.
- `images.unoptimized: true` — `next/image` does not optimize. Don't add a loader.

## Code style

- JavaScript, not TypeScript. Don't add `.ts`/`.tsx` files.
- Prettier config in `.prettierrc` is authoritative. Run Prettier, don't hand-format.
- Components live in `components/` as flat-ish folders. Data lives in `data/` (static JS modules). Don't create `src/`.

## Env files

- `.env` = local dev defaults (committed, currently dirty in git).
- `.env.local` = secrets / local overrides (gitignored).
- **Never modify `.env` files** during sync, rebase, merge, or PR prep. If an env var needs to change, surface it — don't edit silently.

## Deploy

- Vercel. `.vercel/` is committed. Vercel runs `next build` + `next-sitemap` postbuild.
- `next-sitemap.config.js` reads the site URL — verify it before changing domains.

## Git etiquette

- Branches: `hector_dev/<descriptive-name>`.
- Flow: `hector_dev/* → dev → main`. **Never push or merge directly to `main`.**
- **Never delete branches after merge.** No `--delete-branch`, no `git branch -d/-D`, no remote delete.
- Conventional commits with a body.
- Never `git push`, `git merge`, or open a PR without explicit approval.

## Don't touch without asking

- Tracking pixels: `lib/gtag.js`, `lib/gtm.js`, `lib/fpixel.js`, `lib/tikp.js`.
- MercadoPago SDK integration.
- `pages/_app.js` and `pages/_document.js` — load order matters for the mixed UI stack.
