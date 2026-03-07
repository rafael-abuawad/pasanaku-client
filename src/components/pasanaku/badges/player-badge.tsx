import { UsersIcon } from "lucide-react";

interface PlayerBadgeProps {
  count: number;
}

export function PlayerBadge({ count }: PlayerBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-2">
      <UsersIcon className="size-4 text-muted-foreground shrink-0" />
      <span className="text-sm font-medium text-foreground">{count}</span>
    </div>
  );
}
