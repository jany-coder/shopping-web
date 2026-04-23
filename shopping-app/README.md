# FCS Mart — Shopping landing (React + Vite)

Fashion landing page with a small **Express mock API** in the same repo: product catalog, newsletter signup, and client-side wishlist (localStorage).

## Run the app (frontend + API)

From **`shopping-app/`** (or from the repo root **`FCS MART BD/`** if you use the root `package.json`):

```bash
cd shopping-app   # skip if you are already here
npm install
npm run dev:full
```

From repo root only: `npm install` must be run once inside `shopping-app` (dependencies live there). Root scripts use `npm run … --prefix shopping-app`.

This starts:

- **Vite** (default `http://localhost:5173`) — UI
- **Mock API** on **port 3001** — `GET /api/products`, `POST /api/newsletter`, admin routes under `/api/admin/*`

The Vite dev server **proxies** `/api` to the API, so the browser calls `/api/...` with no CORS setup in development.

**Troubleshooting `dev:full`:** On macOS, running Vite and `node --watch` together can hit **“EMFILE: too many open files”**. This project uses plain `node server/index.mjs` for the API (no watch) so both can run. After changing `server/app.mjs` or `server/index.mjs`, restart `npm run server:dev` or `dev:full`. Use `npm run server:dev:watch` only when the API runs **alone** (no Vite).

**HTTP 404 on `/api/*`:** Often **port 3001 is already used by another program** (Cursor, Docker, another API). Vite then proxies `/api` to the wrong process → **404**. Fix: run `lsof -i :3001` (Mac) or Task Manager, stop the other app, restart `npm run dev:full`. Or run this API on another port: `PORT=3002 npm run server:dev` and add **`VITE_API_PROXY_PORT=3002`** to `.env.local` in `shopping-app` so Vite’s proxy matches (same value as `PORT`).

**Other 404 causes:** Wrong URL / `file://` / preview without API. Use **`npm run dev`** or **`npm run dev:full`** from `shopping-app` and open **`http://localhost:5173/admin`**. For **`npm run preview`**, start the API first; preview also proxies `/api`.

### Frontend only

```bash
npm run dev
```

Product and newsletter requests will fail unless the API is running separately:

```bash
npm run server:dev
```

## Environment

| Variable         | Purpose |
|----------------|---------|
| `VITE_API_URL`   | Used in **production** builds only. In `npm run dev`, the app always calls same-origin `/api` (Vite proxy) so a bad `VITE_API_URL` in `.env` cannot break local API calls. Example prod value: `https://your-api.onrender.com` (no trailing slash). |
| `VITE_API_PROXY_PORT` | **Dev / preview only.** Port Vite proxies `/api` to (default `3001`). Must match the API process `PORT`. Use when 3001 is busy, e.g. `PORT=3002` for the server and `VITE_API_PROXY_PORT=3002` in `.env.local`. |

## Admin panel (demo)

- Open **`/admin`** directly, or use the **“Admin — newsletter subscribers”** link under the newsletter email field on the home page.
- **No login** — the page shows subscriber **emails** only when the API is running (local demo).
- **Not secure for production** — the API can still expose subscriber data; add auth before any public deploy.

## Data & persistence

- **Products:** [`server/data/products.json`](server/data/products.json) — edit this file to change catalog fields (`id`, `title`, `category`, `price`, `imageKey`, `cta`). Image keys are resolved in the app via [`src/lib/productImageMap.ts`](src/lib/productImageMap.ts).
- **Newsletter:** Subscribers are appended to `server/data/subscribers.json` (created on first successful signup; ignored by git). Copy [`server/data/subscribers.example.json`](server/data/subscribers.example.json) if you want a starter file locally. Duplicate emails (case-insensitive) return **409** with an error message.
- **Wishlist:** Stored in the browser under the key `fcs-wishlist` (localStorage).

## Production / hosting

### Vercel (single project: UI + mock API)

- Set the Vercel project **Root Directory** to **`shopping-app`** when the repo root is the parent folder.
- Production builds call **same-origin** `/api/...` when **`VITE_API_URL` is unset** (recommended for the default `*.vercel.app` deployment).
- API: [`api/index.mjs`](api/index.mjs) runs the same Express app as locally ([`server/app.mjs`](server/app.mjs)). [`vercel.json`](vercel.json) bundles [`server/data/products.json`](server/data/products.json) via `includeFiles`.
- **Subscribers on Vercel** are written to **`/tmp`** (serverless has no durable repo disk). List can reset on cold starts or when another region/instance handles the request — OK for demos; use a real database for production.

### Other static hosts (GitHub Pages, etc.)

- Deploying **only** the static Vite build **without** a reachable API means product fetch and newsletter submit will not work until you host the Express server (or another backend) and set `VITE_API_URL` to that origin.
- The Express app sets permissive CORS headers so a static site on another domain can call the API when using `VITE_API_URL`.

## Scripts

| Script        | Description |
|---------------|-------------|
| `npm run dev` | Vite only |
| `npm run server:dev` | API only (`node server/index.mjs`) |
| `npm run server:dev:watch` | API with `--watch` (use without Vite if you hit file watcher limits) |
| `npm run dev:full` | Vite + API together |
| `npm run build` | Typecheck + production client build |
| `npm run preview` | Preview production build locally |

---

Below: default Vite template notes (React Compiler, ESLint expansion, etc.).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
