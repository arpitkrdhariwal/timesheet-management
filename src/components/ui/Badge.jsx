const statusStyles = {
  completed: "bg-green-100 text-green-700",
  incomplete: "bg-yellow-100 text-yellow-800",
  missing: "bg-red-100 text-red-600",
};

const statusLabels = {
  completed: "COMPLETED",
  incomplete: "INCOMPLETE",
  missing: "MISSING",
};

export function Badge({ status }) {
  return (
    <span className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
