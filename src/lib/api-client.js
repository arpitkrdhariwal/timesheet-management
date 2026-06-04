async function parseJson(response) {
  const data = await response.json();
  if (!response.ok) throw { status: response.status, ...data };
  return data;
}

export async function fetchTimesheets(filters = {}) {
  const params = new URLSearchParams();
  if (filters.dateRange) params.set("dateRange", filters.dateRange);
  if (filters.status) params.set("status", filters.status);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

  const response = await fetch(`/api/timesheets?${params}`);
  return parseJson(response);
}

export async function fetchWeekDetail(weekId) {
  const response = await fetch(`/api/timesheets/${weekId}`);
  return parseJson(response);
}

export async function createEntry(data) {
  const response = await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJson(response);
}

export async function updateEntryApi(id, data) {
  const response = await fetch(`/api/entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJson(response);
}

export async function deleteEntryApi(id) {
  const response = await fetch(`/api/entries/${id}`, { method: "DELETE" });
  return parseJson(response);
}
