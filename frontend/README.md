# GeoNames City Counter — Frontend

React + TypeScript UI (Vite) that sends the entered prefix to the backend API and displays whatever comes back.
It's intentionally a thin client — no business logic lives here.

## Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm
- The backend running locally on `http://localhost:3000` — see [`../backend/README.md`](../backend/README.md).

## Setup

```bash
cd frontend
npm install
```

## Running

```bash
npm run dev       # start the Vite dev server (http://localhost:5173 by default)
npm run build     # type-check (tsc -b) then build for production into dist/
npm run preview   # serve the production build locally
```

## Design notes

- **Thin and small client on purpose** - everything happens on server side, the UI is only to call and display results
- **The `/api` proxy is dev only** - a real production build would need the API reachable at the same origin, a configurable
  base URL or a reverse proxy in front of both
- **No tests suite** - simple UI, all business logic lives on the server side
