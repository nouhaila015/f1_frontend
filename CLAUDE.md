# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server (http://localhost:5173)
npm run build      # tsc type-check + Vite production build
npm run lint       # ESLint
npm run preview    # serve the production build locally
```

There is no test suite configured.

## Architecture

### Data flow

```
Backend (http://localhost:8000/api)
  └── src/api/         axios functions (fetchSeasonRaces, fetchDriverStandings, …)
        └── src/hooks/ TanStack Query wrappers (useRaces, useDriverStandings, …)
              └── src/pages/  route-level components that own state
                    └── src/components/  pure presentational components
```

- **`src/api/client.ts`** — single `apiClient` axios instance (base URL `http://localhost:8000/api`, 240 s timeout). All API modules import this named export, not a default.
- **`src/api/`** — one file per domain (`races.ts`, `standings.ts`, `drivers.ts`). Each exports plain async functions; no query logic lives here.
- **`src/hooks/`** — thin TanStack Query wrappers around the API functions. `QueryClient` is configured in `main.tsx` with a 5-minute `staleTime`.
- **`src/types/index.ts`** — single source of truth for all TypeScript interfaces (`Session`, `RaceResult`, `DriverStanding`, `TeamStanding`, `DriverStats`). These mirror backend DTOs exactly; don't add fields that aren't in the API response.
- **`src/pages/`** — each page reads URL params via `useParams`, uses `useNavigate` for year changes (year is always a route segment, not state).
- **`src/components/`** — presentational only; receive typed props, no direct API or query calls.

### Routing (React Router v7)

| Route | Page | Notes |
|---|---|---|
| `/` | `HomePage` | |
| `/races/:year` | `RacesPage` | year drives `useRaces` |
| `/races/:year/:sessionKey` | `RaceDetailPage` | sessionKey is the OpenF1 session key |
| `/standings/:year` | `StandingsPage` | tab state (drivers/teams) is local to page |
| `/drivers/:driverNumber/:year` | `DriverPage` | |

Navigation links (in `Header`/`Navigation`) must include the year segment for routes that require it.

### Key conventions

- `apiClient` is a **named** export from `src/api/client.ts` — never import it as a default.
- API functions use `.then(r => r.data)` arrow-function style; hooks use `useQuery` arrow-function style. Keep consistency.
- `DriverStanding` has no `wins` or `team` field — only `firstName`, `lastName`, `nameAcronym`, `headshotsUrl`, `points`.
- `DriverStats` has no `raceResults` array — stats only (`wins`, `podiums`, `dnfs`, `totalPoints`, `racesEntered`, `bestFinish`).
- Team colours from the API are hex strings **without** the `#` prefix; prepend it when setting `style={{ backgroundColor }}`.
- `verbatimModuleSyntax` is enabled — use `import type` for type-only imports.
