# GeoNames City Counter — Backend

REST API that counts cities from GeoNames' top-50-by-population list (`searchJSON`) whose name starts with a given letter or letters.

## Prerequisites

- Node.js 20 or later (uses the native `fetch` API)
- npm

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Then edit `.env` and set your own `GEONAMES_USERNAME`.

| Variable            | Description                                                          | Default            |
| ------------------- | -------------------------------------------------------------------- | ------------------ |
| `GEONAMES_USERNAME` | Your GeoNames account username (required)                            | —                  |
| `PORT`              | Port the server listens on                                           | `3000`             |
| `CACHE_TTL_MS`      | How long the fetched city list is cached before re-fetching GeoNames | `3600000` (1 hour) |

## Running

```bash
npm run dev      # start in watch mode (tsx)
npm run build    # compile to dist/
npm start        # run the compiled build (after npm run build)
```

The server starts on `http://localhost:<PORT>` (default `http://localhost:3000`).

## Testing

```bash
npm test          # run the test suite once
npm run test:watch
```

Tests cover the prefix-matching logic directly (unit tests, using dependency injection instead of mocking — no network involved)

## API

### `GET /api/cities/count?prefix=<letters>`

Returns how many cities in GeoNames' top-50-by-population list start with
the given prefix (case-insensitive).

**Query parameter**

| Param    | Required | Rules                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `prefix` | yes      | 1–10 letters (any Unicode letter, e.g. `ł`, `ź`). No digits, spaces, or symbols. Trimmed. Must appear exactly once. |

**Success — `200 OK`**

```json
{
  "prefix": "c",
  "count": 3,
  "cityNames": ["Cairo", "Chongqing", "Chengdu"]
}
```

**Error — `4xx` / `5xx`**

```json
{
  "error": {
    "code": "INVALID_PREFIX",
    "message": "Query parameter 'prefix' is required."
  }
}
```

| Status | Code             | Meaning                                                                 |
| ------ | ---------------- | ----------------------------------------------------------------------- |
| 400    | `INVALID_PREFIX` | The `prefix` query param failed validation                              |
| 404    | `NOT_FOUND`      | No route matches the request                                            |
| 500    | `INTERNAL_ERROR` | An unexpected server-side error                                         |
| 502    | `UPSTREAM_ERROR` | GeoNames was unreachable, rate-limited, or returned an unexpected shape |

## Design notes

- **Prefix matching, not just a single letter** - decided to extend from single letter to prefix to be able application better.
  Functionality capped at 10 characters on the backend side.
- **City list is fetched once and cached, not at every request** - returned data is identical on every call so caching it with a TTL
  avoid exhausting GeoNames endpoint rate limit. Additionally introduced in-flight request de-duplication which prevents concurrent requests
- **Runtime validation** - introduced validation of user input before it reaches business logic, and Geonames response is validated against expected shape before being cached.
- **Linear scan over the city list is a choice** - the data is capped at 50 items by the query itself, so there's no growth curve to optimise for.
