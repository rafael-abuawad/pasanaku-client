import { formatCompactNumber } from "@/lib/format-number";
import type { Token } from "@/lib/types";

interface TokenBadgeProps {
  token: Token;
  amount: number;
  participans: number;
}

export function TokenBadge({ token, amount, participans }: TokenBadgeProps) {
  const totalAmount = amount * participans;

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-3 py-2">
      <div className="shrink-0 size-7 rounded-full overflow-hidden ring-1 ring-border bg-background">
        <img src={token.icon} alt={token.symbol} className="size-7 object-cover" />
      </div>

      <div className="flex flex-col min-w-0">
        <p className="text-md leading-tight truncate">
          {formatCompactNumber(totalAmount)}{" "}
          <span className="text-xs font-semibold">{token.symbol}</span>
        </p>
      </div>
    </div>
  );
}
