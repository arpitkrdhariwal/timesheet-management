# ticktock — Timesheet Management App

A SaaS-style timesheet management application built with **React (JavaScript)** and Next.js. The UI is standard React components (`.jsx` files with hooks and props). Next.js provides routing and API routes only.

Users can log in, view weekly timesheets on a dashboard, and add or edit time entries per week.

## Live demo (Netlify)

This app is configured for [Netlify](https://www.netlify.com) using the [Netlify Next.js runtime](https://docs.netlify.com/frameworks/next-js/overview/).

### Deploy to Netlify

1. Push the repo to GitHub.
2. In Netlify: **Add new site** → **Import from Git** → select the repo.
3. Build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Plugin:** `@netlify/plugin-nextjs`
4. Under **Site configuration → Environment variables**, add:

   | Variable | Value |
   |----------|--------|
   | `NEXTAUTH_SECRET` | A long random string (required), e.g. `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Optional — auto-set from your Netlify URL. Set manually if using a custom domain, e.g. `https://your-app.netlify.app` |

5. Deploy. Open the site URL → you should see the **login** page.

**Demo login:** `john@example.com` / `password123`

### Netlify notes

- API routes, middleware, and NextAuth run as **serverless functions** (not static export).
- Mock data is **in-memory** on each server instance. Add/edit works during a session but may reset when Netlify cold-starts a function. Reload seed by redeploying or using `POST /api/seed/reset` (disabled in production).
- Node **20** is used (see `.nvmrc` and `netlify.toml`).

## Setup instructions

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set NEXTAUTH_SECRET to any random string
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should land on the **login** page (not the default Next.js starter).

If you see “To get started, edit the page.tsx”, stop the server and run:

```bash
npm run dev:clean
```

### Demo login

| Field    | Value              |
|----------|--------------------|
| Email    | `john@example.com` |
| Password | `password123`      |

### Other commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run test     # Unit / component tests
```

## Frameworks & libraries

| Package | Purpose |
|---------|---------|
| [React 19](https://react.dev) | UI (components, hooks, state) |
| [Next.js 16](https://nextjs.org) | Routing + API routes (not the UI layer) |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [NextAuth.js v4](https://next-auth.js.org) | Authentication (JWT session) |
| [Lucide React](https://lucide.dev) | Icons |
| [Recharts](https://recharts.org) | Week detail charts (daily hours & project breakdown) |
| [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) | Tests |

**Font:** [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google`.

## Project structure

```
src/
├── app/
│   ├── api/              # Internal API routes (no mock data in UI)
│   ├── login/
│   └── timesheets/       # Dashboard & week detail pages
├── components/
│   ├── auth/             # Login form
│   ├── layout/           # Header, footer
│   ├── timesheets/       # Table, filters, modal, charts, week view
│   └── ui/               # Badge, Button
├── data/                 # JSON seed data (API layer only)
├── lib/                  # Shared logic — see docs/CODE_GUIDE.md
```

**Comfortable with React?** Read [docs/REACT_GUIDE.md](docs/REACT_GUIDE.md) — maps React patterns to this project.

**New to the codebase?** Read [docs/CODE_GUIDE.md](docs/CODE_GUIDE.md) for data flow and file structure.

## Features

- **Login:** Split-screen UI with credentials auth via NextAuth (JWT stored in HTTP-only session cookie).
- **Dashboard:** Sortable table (Week #, Date, Status, Actions) with date range and status filters, pagination.
- **Week detail:** Daily grouped entries, progress bar (target 40 hrs), add/edit/delete via modal. **Graph view** (toggle) shows bar chart (hours per day) and donut chart (hours by project).
- **Status rules:** `completed` = 40 hrs, `incomplete` = 1–39 hrs, `missing` = 0 hrs.
- **API:** All client data flows through `/api/*` routes; UI never imports seed JSON directly.

## Assumptions & notes

- Mock data lives in `src/data/*.json` and is loaded into an in-memory store on the server (`data-store.js`). On Netlify, data may reset when serverless functions cold-start.
- **Completed weeks in seed data:** Week **1**, **6**, and **10** each have exactly **40 hours** (status: COMPLETED). Week 2 and 4 are incomplete; others are missing.
- If you don't see COMPLETED rows after testing (add/edit/delete), restart `npm run dev` or call `POST /api/seed/reset` while logged in to restore seed data.
- Date range filter uses preset month ranges; selecting a range that spans multiple weeks returns all matching weeks.
- Week detail lists every day from the week’s start date through its end date.
- “Remember me” is displayed on the login form but session length is fixed by NextAuth JWT `maxAge` (24 hours).
- Middleware protects `/timesheets/*` routes; unauthenticated users are redirected to login.

## Time spent

Approximately **4–5 hours** for scaffolding, API layer, UI to match designs, auth, tests, and documentation.

## Evaluation alignment

| Criteria | Approach |
|----------|----------|
| UI/UX | Responsive layout, design-matched login, dashboard, and modal |
| Code quality | Modular components, shared types, separated API / UI / data |
| API integration | Client `fetch` → internal routes, loading & error states |
| State management | React hooks + NextAuth session |
| Testing | Vitest unit tests for utils and component tests for Badge & LoginForm |
| Readability | README + [docs/CODE_GUIDE.md](docs/CODE_GUIDE.md) for structure and conventions |
