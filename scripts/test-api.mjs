/**
 * Quick smoke test for API routes (run while dev server is up).
 * Usage: node scripts/test-api.mjs
 */

const BASE = process.env.BASE_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { status: res.status, json };
}

async function main() {
  console.log("Testing ticktock API at", BASE);

  const providers = await request("/api/auth/providers");
  console.log(providers.status === 200 ? "✓" : "✗", "GET /api/auth/providers", providers.status);

  const timesheets = await request("/api/timesheets");
  const authed = timesheets.status === 401;
  console.log(authed ? "✓" : "✗", "GET /api/timesheets requires auth", timesheets.status);

  const week = await request("/api/timesheets/week-1");
  console.log(week.status === 401 ? "✓" : "✗", "GET /api/timesheets/week-1 protected", week.status);

  console.log("\nNote: POST /api/entries needs a logged-in session cookie.");
  console.log("After fix, add a task in the UI — it should return 201, not 500.");
}

main().catch(console.error);
