import { describe, it, expect } from "vitest";
import {
  calculateStatus,
  getActionLabel,
  getProgressPercent,
  sumHours,
  weekOverlapsRange,
} from "@/lib/timesheet-utils";

const mockEntry = (hours) => ({
  id: "1",
  weekId: "week-1",
  date: "2024-01-01",
  dateLabel: "Jan 1",
  projectId: "1",
  projectName: "Test",
  workType: "Dev",
  description: "Task",
  hours,
});

describe("calculateStatus", () => {
  it("returns missing when 0 hours", () => {
    expect(calculateStatus(0)).toBe("missing");
  });
  it("returns incomplete for partial hours", () => {
    expect(calculateStatus(20)).toBe("incomplete");
  });
  it("returns completed at 40 hours", () => {
    expect(calculateStatus(40)).toBe("completed");
  });
});

describe("sumHours", () => {
  it("sums entry hours", () => {
    expect(sumHours([mockEntry(4), mockEntry(8)])).toBe(12);
  });
});

describe("getActionLabel", () => {
  it("maps status to action", () => {
    expect(getActionLabel("completed")).toBe("View");
    expect(getActionLabel("missing")).toBe("Create");
  });
});

describe("weekOverlapsRange", () => {
  it("returns true with no filter", () => {
    expect(weekOverlapsRange("2024-01-01", "2024-01-05")).toBe(true);
  });
});
