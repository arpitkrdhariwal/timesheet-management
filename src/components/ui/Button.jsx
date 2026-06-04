const variants = {
  primary: "bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-400",
  secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
