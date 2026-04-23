# FCS Mart — Shopping landing (React + Vite)

Fashion landing page frontend (React + Vite). Backend now lives in a separate sibling project: **`../shopping-backend`**.

## Run the app (frontend + API)

From **`shopping-app/`**:

```bash
npm install
npm run dev
```

In another terminal, run the backend from `shopping-backend/`:

```bash
cd ../shopping-backend
npm install
MONGODB_URI=mongodb://127.0.0.1:27017 MONGODB_DB=fcs_mart npm run dev
```

This starts:

- **Vite** (default `http://localhost:5173`) — UI
- **Backend API** on **port 3001** from `shopping-backend`

The Vite dev server **proxies** `/api` to the API, so the browser calls `/api/...` with no CORS setup in development.

**HTTP 404 on `/api/*`:** Usually backend is not running or `VITE_API_URL` points to a wrong host/port. Start `shopping-backend` and verify API URL.

**Other 404 causes:** Wrong URL / `file://` / preview without API. Use **`npm run dev`** from `shopping-app` and open **`http://localhost:5173/admin`**.

### Frontend only

```bash
npm run dev
```

Product and newsletter requests will fail unless the backend (`shopping-backend`) is running.

## Environment

| Variable         | Purpose |
|----------------|---------|
| `VITE_API_URL`   | Frontend API base URL. Example: `http://127.0.0.1:3001` (local) or `https://your-api.onrender.com` (production). |
| `VITE_API_PROXY_PORT` | **Dev / preview only.** Port Vite proxies `/api` to (default `3001`). Must match the API process `PORT`. Use when 3001 is busy, e.g. `PORT=3002` for the server and `VITE_API_PROXY_PORT=3002` in `.env.local`. |

## Admin panel (demo)

- Open **`/admin`** directly, or use the **“Admin — newsletter subscribers”** link under the newsletter email field on the home page.
- Demo login uses client-side-only credentials (`admin` / `admin`) and is **not secure**.
- **Not secure for production** — the API can still expose subscriber data; add auth before any public deploy.

## Data & persistence

- **Products / Newsletter:** served by `shopping-backend` (MongoDB).
- **Wishlist:** Stored in the browser under the key `fcs-wishlist` (localStorage).

## Production / hosting

### Deploying with separate backend

- Deploy frontend (`shopping-app`) and backend (`shopping-backend`) as separate services.
- Set `VITE_API_URL` in frontend deployment to the backend origin.
- Set `MONGODB_URI` (and optional `MONGODB_DB`) in backend deployment.

### Deploy `shopping-app` on Vercel

This repo is configured for Vercel SPA hosting via `vercel.json`.

1. Import `shopping-app` as a Vercel project.
2. Root directory should be **`shopping-app`**.
3. In Vercel Project -> Settings -> Environment Variables, add:
   - `VITE_API_URL=https://<your-backend-domain>`
4. Deploy.

Verify after deploy:

- Frontend opens on `/` and `/admin` (SPA rewrite works)
- Network requests go to `https://<your-backend-domain>/api/...`

## Scripts

| Script        | Description |
|---------------|-------------|
| `npm run dev` | Vite only |
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
