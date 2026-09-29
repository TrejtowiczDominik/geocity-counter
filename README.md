# GeoNames City Counter

A small full-stack app where you can enter a letter (or a few letters) and see how many cities from Geonames top-50-by-population list start with it.

## Project layout

```
.
├── backend/   # Node.js / Express / TypeScript REST API — see backend/README.md
├── frontend/  # React UI / Typescript — see frontend/README.md
└── README.md  # you are here
```

## Quick start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then set your own GEONAMES_USERNAME
npm run dev            # start in watch mode (tsx)
```

Runs on `http://localhost:3000` by default.

### 2. Frontend

In a separate terminal, with the backend already running:

```bash
cd frontend
npm install
npm run dev            # start in watch mode (tsx)
```

Runs on `http://localhost:5173` by default, and proxies `/api` requests
to the backend on port 3000.

## Documentation

- [`backend/README.md`](backend/README.md) — API contract, environment
  variables, testing, and the design decisions behind the backend.
- [`frontend/README.md`](frontend/README.md) — setup, running, and the
  thin-client design of the UI.
