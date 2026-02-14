const statusConfig = {
  active: { label: "Active", className: "bg-success/10 text-success" },
  potential: { label: "Potential", className: "bg-info/10 text-info" },
  contacted: { label: "Contacted", className: "bg-warning/10 text-warning" },
  committed: { label: "Committed", className: "bg-accent/10 text-accent" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground" },
  completed: { label: "Completed", className: "bg-success/10 text-success" },
  planning: { label: "Planning", className: "bg-info/10 text-info" },
} as const;

type StatusType = keyof typeof statusConfig;

export default function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
