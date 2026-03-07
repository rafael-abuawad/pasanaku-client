import type { Token } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import crvUsdIcon from "@/assets/images/tokens/crvUSD.svg";
import { TokenBadge } from "./badges/token-badge";
import { PlayerBadge } from "./badges/player-badge";
import { RecoveredBadge } from "./badges/recovered-badge";

const DEFAULT_TOKEN: Token = {
  symbol: "crvUSD",
  address: "0x498bf2b1e120fed3ad3d42ea2165e9b73f99c1e5",
  icon: crvUsdIcon,
  category: "stable",
};

interface GameCardProps {
  title?: string;
  token?: Token;
  amount?: number;
  playerCount?: number;
}

export function GameCard({
  title = "Pasanaku #10",
  token = DEFAULT_TOKEN,
  amount = 1000,
  playerCount = 12,
}: GameCardProps) {
  return (
    <Card className="relative mx-auto w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-square bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-square w-full object-cover brightness-60 grayscale dark:brightness-40"
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          {token && <TokenBadge token={token} amount={amount} participans={playerCount} />}
          <PlayerBadge count={playerCount} />
          <RecoveredBadge />
        </div>
      </CardContent>
    </Card>
  );
}
