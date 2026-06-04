import { describe, it, expect } from "vitest";
import { buildDailyHoursData, buildProjectHoursData, getDailyTarget } from "@/lib/chart-data";

const entry = (overrides) => ({
  id: "1",
  weekId: "week-1",
  dateLabel: "Jan 1",
  projectId: "1",
  projectName: "Alpha",
  workType: "Dev",
  description: "Task",
  hours: 4,
  ...overrides,
});

describe("buildDailyHoursData", () => {
  it("sums hours per day", () => {
    const data = buildDailyHoursData(["2024-01-01", "2024-01-02"], {
      "2024-01-01": [entry({ date: "2024-01-01", hours: 4 })],
      "2024-01-02": [entry({ date: "2024-01-02", hours: 8, id: "2" })],
    });
    expect(data[0].hours).toBe(4);
    expect(data[1].hours).toBe(8);
  });
});

describe("getDailyTarget", () => {
  it("spreads 40 hours across days", () => {
    expect(getDailyTarget(5)).toBe(8);
  });
});
