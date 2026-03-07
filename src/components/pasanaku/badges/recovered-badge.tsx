import { AlertTriangleIcon } from "lucide-react";

export function RecoveredBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-2">
      <AlertTriangleIcon className="size-4 text-muted-foreground shrink-0" />
      <span className="text-sm font-medium text-foreground">Recovered</span>
    </div>
  );
}
