"use client";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 4, columns = 6 }: TableSkeletonProps) {
  const widths = [
    ["w-20", "w-36", "w-24", "w-16", "w-28", "w-16"],
    ["w-24", "w-44", "w-20", "w-20", "w-32", "w-14"],
    ["w-16", "w-32", "w-28", "w-16", "w-24", "w-20"],
    ["w-28", "w-40", "w-16", "w-24", "w-36", "w-16"],
  ];

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => {
        const rowWidths = widths[rowIdx % widths.length];

        return (
          <tr key={rowIdx} className="border-b border-neutral-purple-100/80">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="py-4 px-4">
                <div className="animate-pulse space-y-1.5">
                  <div
                    className={`h-3.5 bg-neutral-purple-200/80 rounded-md ${
                      rowWidths[colIdx % rowWidths.length] || "w-24"
                    }`}
                  />
                  {colIdx === 1 && (
                    <div className="h-2.5 bg-neutral-purple-100 rounded-md w-24" />
                  )}
                </div>
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
}

interface TableEmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  description?: string;
  resetAction?: () => void;
  resetLabel?: string;
  colSpan?: number;
}

export function TableEmptyState({
  icon: Icon,
  title = "No matching records found",
  description = "No items match your active search or filter criteria.",
  resetAction,
  resetLabel = "Reset Filters",
  colSpan = 7,
}: TableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 px-4 text-center">
        <div className="max-w-sm mx-auto flex flex-col items-center justify-center space-y-2.5">
          {Icon && (
            <div className="w-10 h-10 rounded-full bg-neutral-purple-100 flex items-center justify-center text-neutral-purple-600 mb-1">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h3 className="text-sm font-bold text-neutral-purple-900">{title}</h3>
          <p className="text-xs text-neutral-purple-600 leading-relaxed">
            {description}
          </p>
          {resetAction && (
            <button
              type="button"
              onClick={resetAction}
              className="mt-2 px-3 py-1.5 text-xs font-semibold text-primary-green-800 bg-primary-green-50 hover:bg-primary-green-100 border border-primary-green-300 rounded-lg transition-colors shadow-2xs"
            >
              {resetLabel}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
