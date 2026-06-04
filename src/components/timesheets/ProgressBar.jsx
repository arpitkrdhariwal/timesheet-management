import { TARGET_HOURS } from "@/lib/timesheet-utils";

export function ProgressBar({ totalHours }) {
  const percent = Math.min(100, Math.round((totalHours / TARGET_HOURS) * 100));

  return (
    <div className="w-full shrink-0 sm:w-[200px]">
      <p className="mb-1 text-right text-sm font-bold text-slate-900">
        {totalHours}/{TARGET_HOURS} hrs
      </p>
      <div className="flex items-center gap-1.5">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-orange-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="shrink-0 text-[10px] font-medium text-slate-400">
          100%
        </span>
      </div>
    </div>
  );
}
