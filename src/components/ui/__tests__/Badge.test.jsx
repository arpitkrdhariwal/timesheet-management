import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders COMPLETED", () => {
    render(<Badge status="completed" />);
    expect(screen.getByText("COMPLETED")).toBeInTheDocument();
  });
});
