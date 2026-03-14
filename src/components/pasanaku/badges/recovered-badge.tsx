import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon } from "@hugeicons/core-free-icons";

export function RecoveredBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-2">
      <HugeiconsIcon icon={Alert01Icon} size={16} className="text-muted-foreground shrink-0" />
      <span className="text-sm font-medium text-foreground">Recovered</span>
    </div>
  );
}
