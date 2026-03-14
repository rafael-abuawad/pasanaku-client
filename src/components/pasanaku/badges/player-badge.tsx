import { HugeiconsIcon } from "@hugeicons/react";
import { UserMultipleIcon } from "@hugeicons/core-free-icons";

interface PlayerBadgeProps {
  count: number;
}

export function PlayerBadge({ count }: PlayerBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-2">
      <HugeiconsIcon icon={UserMultipleIcon} size={16} className="text-muted-foreground shrink-0" />
      <span className="text-sm font-medium text-foreground">{count}</span>
    </div>
  );
}
