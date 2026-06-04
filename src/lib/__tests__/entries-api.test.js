import { describe, it, expect, beforeEach } from "vitest";
import { validateEntry } from "@/lib/api-helpers";
import { addEntry, getEntriesByWeekId, resetEntriesForTests } from "@/lib/data-store";

describe("add entry flow", () => {
  beforeEach(() => {
    resetEntriesForTests();
  });

  it("validateEntry rejects empty form", () => {
    const errors = validateEntry({}, { requireWeekAndDate: true });
    expect(errors.weekId).toBeDefined();
    expect(errors.projectId).toBeDefined();
  });

  it("validateEntry accepts valid payload", () => {
    const errors = validateEntry(
      {
        weekId: "week-1",
        date: "2024-01-01",
        projectId: "1",
        workType: "Bug fixes",
        description: "Test task",
        hours: 4,
      },
      { requireWeekAndDate: true }
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("addEntry persists to data store", () => {
    const before = getEntriesByWeekId("week-4").length;
    addEntry({
      weekId: "week-4",
      date: "2024-01-21",
      dateLabel: "Jan 21",
      projectId: "3",
      projectName: "Homepage Development",
      workType: "Bug fixes",
      description: "New task",
      hours: 4,
    });
    expect(getEntriesByWeekId("week-4").length).toBe(before + 1);
  });
});
