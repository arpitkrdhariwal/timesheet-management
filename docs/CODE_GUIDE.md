# Code guide for developers

The UI is **React (JavaScript `.jsx`)**. See [REACT_GUIDE.md](./REACT_GUIDE.md) if you work mainly in React.

A quick map of how this app is organized and where to change things.

## Data flow

```
JSON seed files (src/data/)
        ↓
data-store.ts          ← only used by API routes
        ↓
/api/* routes          ← auth + read/write data
        ↓
api-client.ts          ← fetch helpers used by pages
        ↓
React pages/components ← UI only, no direct JSON imports
```

## Folder responsibilities

| Folder | What goes here |
|--------|----------------|
| `src/app/` | Pages and API routes (Next.js App Router) |
| `src/components/ui/` | Small reusable UI (Button, Badge) |
| `src/components/layout/` | Header, Footer |
| `src/components/timesheets/` | Everything for dashboard + week view |
| `src/components/auth/` | Login form |
| `src/data/` | Static JSON mock data |
| `src/lib/` | Shared logic (no React) |
| `src/types/` | TypeScript interfaces |

## Key files

| File | Purpose |
|------|---------|
| `lib/data-store.ts` | Reads JSON, stores entries in memory |
| `lib/api-client.ts` | Client-side `fetch` to `/api` |
| `lib/api-helpers.ts` | Auth check + validation for API routes |
| `lib/timesheet-utils.ts` | Status rules, date formatting, filters |
| `lib/date-utils.ts` | Week date range helpers |
| `lib/chart-data.ts` | Transforms entries into chart data |
| `lib/auth.ts` | NextAuth config |

## Business rules

**Timesheet status** (in `timesheet-utils.ts`):

- `missing` → 0 hours
- `incomplete` → 1–39 hours
- `completed` → exactly 40 hours

## Common tasks

**Add a new API field**  
1. Update type in `src/types/index.ts`  
2. Update `data-store.ts` and seed JSON  
3. Update the API route  
4. Update `api-client.ts` and the component that displays it  

**Change login credentials**  
Edit `src/data/users.json`

**Add a filter on the dashboard**  
Edit `TimesheetFilters.tsx` and `app/api/timesheets/route.ts`

## Conventions

- One component per file, named after what it renders
- Pages stay thin — load data, pass props to components
- Shared logic lives in `lib/`, not inside components
- API routes use `requireSession()` from `api-helpers.ts`
