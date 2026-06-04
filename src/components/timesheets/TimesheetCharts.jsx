"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  buildDailyHoursData,
  buildProjectHoursData,
  getDailyTarget,
} from "@/lib/chart-data";
import { TARGET_HOURS } from "@/lib/timesheet-utils";

const CHART_HEIGHT = 200;

export function TimesheetCharts({ weekDates, entriesByDate, totalHours }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dailyData = useMemo(
    () => buildDailyHoursData(weekDates, entriesByDate),
    [weekDates, entriesByDate]
  );

  const projectData = useMemo(
    () => buildProjectHoursData(entriesByDate),
    [entriesByDate]
  );

  const dailyTarget = getDailyTarget(weekDates.length);
  const hasProjectData = projectData.length > 0;
  const hasAnyHours = totalHours > 0;

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Weekly insights</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Hours logged per day and by project
          </p>
        </div>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{totalHours}</span>
          <span className="text-slate-500"> / {TARGET_HOURS} hrs total</span>
        </p>
      </div>

      {!hasAnyHours ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-sm text-slate-500">
          No hours logged yet — add tasks to see charts
        </div>
      ) : !mounted ? (
        <div
          className="grid gap-6 lg:grid-cols-2"
          style={{ minHeight: CHART_HEIGHT }}
        >
          <div className="animate-pulse rounded-lg bg-slate-200" />
          <div className="animate-pulse rounded-lg bg-slate-200" />
        </div>
      ) : (
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-sm font-medium text-slate-700">Hours per day</h3>
            <div className="w-full" style={{ height: CHART_HEIGHT, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart
                  data={dailyData}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    domain={[0, "auto"]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                    }}
                    formatter={(value) => [`${value} hrs`, "Logged"]}
                  />
                  <ReferenceLine
                    y={dailyTarget}
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    label={{
                      value: `Target ${dailyTarget}h/day`,
                      position: "insideTopRight",
                      fontSize: 11,
                      fill: "#94a3b8",
                    }}
                  />
                  <Bar dataKey="hours" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-sm font-medium text-slate-700">Hours by project</h3>
            {hasProjectData ? (
              <div className="w-full" style={{ height: CHART_HEIGHT, minWidth: 0 }}>
                <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      dataKey="hours"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {projectData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        fontSize: "13px",
                      }}
                      formatter={(value) => [`${value} hrs`, "Hours"]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs text-slate-600">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div
                className="flex items-center justify-center text-sm text-slate-500"
                style={{ height: CHART_HEIGHT }}
              >
                No project data
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
