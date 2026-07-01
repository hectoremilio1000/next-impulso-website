# Impulso Restaurantero — Sitio Web

Sitio de marketing de **Impulso Restaurantero**. Next.js 15 (Pages Router) exportado como **sitio estático** y desplegado en Vercel.

> Doc de arquitectura/overview. Las **convenciones y reglas** del repo viven en [`CLAUDE.md`](./CLAUDE.md) — este archivo no las repite, las complementa.

---

## TL;DR

| | |
|---|---|
| **Framework** | Next.js `^15.5.2`, **Pages Router** (no App Router) |
| **Rendering** | `output: "export"` → **export estático**. Sin SSR en runtime, sin API routes, sin middleware |
| **Lenguaje** | JavaScript (no TypeScript) |
| **Deploy** | Vercel (`next build` + `next-sitemap` postbuild) |
| **UI stack** | Tailwind + Ant Design + styled-components + emotion (mixto, intencional) |
| **Datos dinámicos** | 2 APIs externas Adonis vía env `NEXT_PUBLIC_*` (blog y traspasos) |

---

## Comandos

```bash
npm run dev     # next dev (puerto auto desde 3000 vía scripts/start.js)
npm run build   # next build  → postbuild corre next-sitemap (genera ./out + robots.txt)
npm run start   # NO sirve build de prod — delega a dev (scripts/start.js)
```

No hay suite de tests ni script de lint. No agregar sin preguntar.

---

## Arquitectura

### Export estático (lo más importante)

`next.config.js` fija `output: "export"`. Implicaciones duras:

- **No** `getServerSideProps`, **no** API routes, **no** middleware, **no** `revalidate` en request-time.
- Solo `getStaticProps` / `getStaticPaths`.
- El contenido dinámico (blog, traspasos) se obtiene **en build time** o **client-side** vía variables `NEXT_PUBLIC_*`.
- `images.unoptimized: true` → `next/image` no optimiza. No agregar loader.
- `remotePatterns` permite imágenes desde `media.impulsorestaurantero.com/traspasos/**`.

### Pages Router

Estructura en `pages/`, sin `app/`, sin Server Components ni Server Actions.

### UI stack mixto (no consolidar)

Conviven por diseño — **no migrar componentes entre ellos sin pedirlo**:

- **Tailwind** (`tailwind.config.js`, `postcss.config.js`) — styling primario. Colores de marca: `principal: #a78b21` (dorado), `secundario`. Plugin `@tailwindcss/aspect-ratio`.
- **Ant Design** (`antd` + `@ant-design/nextjs-registry`; `next.config.js` transpila ~40 paquetes `rc-*`) — usado en `pages/plans.js` y `pages/encuesta.js`.
- **CSS Modules** (`*.module.css` por componente) + CSS plano (`styles/global.css`, `main.css`).
- **styled-components** / **emotion** (`@emotion/react`) — declarados como deps y listados en `CLAUDE.md` como parte del stack mixto, pero **sin imports directos en el código de la app** (probablemente transitivos vía antd/emotion o legacy). No quitarlos sin confirmar.

Carruseles legacy coexistiendo (**no consolidar**, usar el que ya use la página): `swiper` es el **dominante** (Swiper1/2/Home/Prueba, Carousel, Sliders, en `index.js` y `comolohacemos.js`); `owl.carousel` / `react-owl-carousel` y `flickity` están declarados pero **sin imports directos** (dormidos).

Animación: `framer-motion`. Otros: `@headlessui/react`, `react-icons`, `react-youtube`, `react-calendly`.

---

## APIs externas

Ambas son servicios **Adonis** consumidos por env vars públicas:

| Lib | Env var | Qué hace |
|---|---|---|
| [`lib/blogApi.js`](./lib/blogApi.js) | `NEXT_PUBLIC_BLOG_API` | Blog (Adonis en Railway). `listBlogPosts`, `getBlogPostBySlug`, `getBlogPostById`, `fmtDate`. Cache `revalidate: 30`. |
| [`lib/traspasosApi.js`](./lib/traspasosApi.js) | `NEXT_PUBLIC_TRASPASOS_API` | Traspasos (Adonis local, puerto 53107). Valida que la URL sea absoluta. |

Otras env vars en `.env`: `NEXT_PUBLIC_API_KEY`, `NEXT_PUBLIC_API_URL`.

---

## Estructura de carpetas

```
pages/            Rutas (Pages Router)
  index.js              Home
  contacto.js           Contacto (rediseñado)
  comolohacemos.js + comolohacemos/*   Landing "cómo lo hacemos" + 11 subpáginas
  casosexito/[id].js + index.js        Casos de éxito (dinámico)
  casosexitos/*         Casos de éxito estáticos individuales
  blog/[slug].js + index.js            Blog (dinámico desde blogApi)
  traspasos/[id].js + index.js         Traspasos (dinámico desde traspasosApi)
  pruebagratis.js, demogratis.js, plans.js, encuesta.js, prueba.js
  gracias.js, gracias_ads.js           Páginas de agradecimiento (conversión)
  privacy_policy.js, terms_service.js  Legales
  _app.js, _document.js, layout.js     Shell (orden de carga importa — no tocar sin preguntar)

components/       ~60 carpetas flat-ish (incl. NavBar variantes, BookingWidget)
lib/              APIs + tracking pixels + widgets/tracker
data/             Datos estáticos JS (blogPosts.js, paquetes.js, HomeData/, assets/, imagenes/)
public/           Estáticos servidos
scripts/start.js  Dev server que auto-elige puerto libre desde 3000 (detect-port)
styles/           Estilos globales
utils/            Utilidades
```

---

## Tracking / pixels (no tocar sin pedirlo)

`lib/gtag.js` (Google Analytics), `lib/gtm.js` (Google Tag Manager), `lib/fpixel.js` (Facebook Pixel), `lib/tikp.js` (TikTok Pixel), `lib/tracker.js` (tracker first-party). También integración **MercadoPago SDK** (`@mercadopago/sdk-react`).

---

## Configuración clave

- **`next.config.js`** — `output: "export"`, `transpilePackages` (MercadoPago + antd + rc-*), `images.unoptimized`.
- **`next-sitemap.config.js`** — `siteUrl` = `SITE_URL` env o `https://impulsorestaurantero.com`; genera robots.txt; `outDir: "./out"`. Verificar antes de cambiar dominio.
- **`.prettierrc`** — autoritativo. Correr Prettier, no formatear a mano.
- **`tailwind.config.js`** / **`postcss.config.js`** — Tailwind + `@tailwindcss/aspect-ratio`.

---

## Env files

- `.env` — defaults de dev local (commiteado).
- `.env.local` — secrets / overrides locales (gitignored).
- **Nunca modificar archivos `.env`** en sync/rebase/merge/PR. Si una var debe cambiar, se avisa — no se edita en silencio.

---

## Deploy

- **Vercel**. `.vercel/` commiteado. Vercel corre `next build` + postbuild `next-sitemap`.
- Output estático en `./out`.

---

## Git

- Branches: `hector_dev/<descriptive-name>`.
- Flujo: `hector_dev/* → dev → main`. **Nunca push/merge directo a `main`.**
- **Nunca borrar branches tras merge.**
- Commits convencionales con body. Nunca `push`/`merge`/PR sin aprobación explícita.
