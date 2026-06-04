/** Groups entries by date (YYYY-MM-DD) */
export function groupEntriesByDate(entries) {
  const grouped = {};
  for (const entry of entries) {
    if (!grouped[entry.date]) grouped[entry.date] = [];
    grouped[entry.date].push(entry);
  }
  return grouped;
}
