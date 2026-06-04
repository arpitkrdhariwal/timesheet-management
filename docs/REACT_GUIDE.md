# React guide — ticktock app

This project **is a React application**. Next.js is only the framework around it (routing, API routes, build).

## What is React here?

Every screen is built with **React components** using familiar patterns:

```jsx
// useState — local UI state
const [loading, setLoading] = useState(true);

// useEffect — load data when page opens
useEffect(() => {
  loadTimesheets();
}, [loadTimesheets]);

// Props — pass data from parent to child
<WeekDetailView week={week} onRefresh={loadWeek} />
```

Files use `.jsx` (React + JavaScript), not TypeScript.

## React components (UI only)

| Component | What it does |
|-----------|----------------|
| `LoginForm.jsx` | Login form, validation, calls NextAuth |
| `TimesheetTable.jsx` | Dashboard table |
| `WeekDetailView.jsx` | Week page — list of tasks per day |
| `EntryModal.jsx` | Add/Edit task popup |
| `TimesheetCharts.jsx` | Graph view (Recharts) |
| `Header.jsx` | Top nav + sign out |

All live in `src/components/`.

## Pages (React + Next.js routing)

| File | Route |
|------|-------|
| `app/login/page.jsx` | `/login` |
| `app/timesheets/page.jsx` | `/timesheets` (dashboard) |
| `app/timesheets/[weekId]/page.jsx` | `/timesheets/week-4` etc. |

Pages are thin: they `fetch` data and render components.

## Data fetching (React pattern)

```jsx
// 1. State
const [timesheets, setTimesheets] = useState([]);

// 2. Load from API
const load = async () => {
  const response = await fetchTimesheets({ page: 1 });
  setTimesheets(response.data);
};

// 3. Run on mount
useEffect(() => { load(); }, []);
```

`fetchTimesheets` is in `src/lib/api-client.js` — plain `fetch`, no TypeScript.

## What is NOT React?

These are **Next.js server** files (you rarely edit them):

- `src/app/api/**` — backend API routes
- `src/lib/data-store.js` — mock database
- `src/lib/auth.js` — login config
- `middleware.js` — protect routes

## If you know React, start here

1. `src/components/timesheets/WeekDetailView.jsx` — main week UI
2. `src/app/timesheets/page.jsx` — dashboard page
3. `src/lib/api-client.js` — how data is loaded
