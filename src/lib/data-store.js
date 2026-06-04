import usersData from "@/data/users.json";
import projectsData from "@/data/projects.json";
import workTypesData from "@/data/work-types.json";
import timesheetsSeed from "@/data/timesheets-seed.json";
import entriesSeed from "@/data/entries-seed.json";
import {
  calculateStatus,
  formatDateRange,
  sumHours,
} from "@/lib/timesheet-utils";

let entries = structuredClone(entriesSeed);

export function getUsers() {
  return usersData;
}

export function getProjects() {
  return projectsData;
}

export function getWorkTypes() {
  return workTypesData;
}

export function getWeeklyTimesheets() {
  return timesheetsSeed.map((week) => {
    const weekEntries = getEntriesByWeekId(week.id);
    const totalHours = sumHours(weekEntries);
    return {
      ...week,
      totalHours,
      status: calculateStatus(totalHours),
      dateLabel: week.dateLabel || formatDateRange(week.startDate, week.endDate),
    };
  });
}

export function getWeeklyTimesheetById(id) {
  return getWeeklyTimesheets().find((week) => week.id === id);
}

export function getEntriesByWeekId(weekId) {
  return entries.filter((entry) => entry.weekId === weekId);
}

export function addEntry(entry) {
  const newEntry = { ...entry, id: `entry-${Date.now()}` };
  entries = [...entries, newEntry];
  return newEntry;
}

export function updateEntry(id, updates) {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return null;
  entries[index] = { ...entries[index], ...updates };
  return entries[index];
}

export function deleteEntry(id) {
  const lengthBefore = entries.length;
  entries = entries.filter((entry) => entry.id !== id);
  return entries.length < lengthBefore;
}

/** Restores entries from seed JSON (used in tests and demo reset) */
export function resetEntriesFromSeed() {
  entries = structuredClone(entriesSeed);
}

export function resetEntriesForTests() {
  resetEntriesFromSeed();
}
