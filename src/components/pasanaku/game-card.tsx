import { useReadPasanakuGame } from "@/hooks/use-pasanaku-game";
import { formatUnits } from "viem";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon } from "@hugeicons/core-free-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenBadge } from "@/components/pasanaku/badges/token-badge";
import { PlayerBadge } from "@/components/pasanaku/badges/player-badge";
import { RecoveredBadge } from "@/components/pasanaku/badges/recovered-badge";
import { EndedBadge } from "@/components/pasanaku/badges/ended-badge";

interface GameCardProps {
  tokenId: bigint;
}

export function GameCard({ tokenId }: GameCardProps) {
  const { data, isLoading, isError, error } = useReadPasanakuGame(tokenId);

  if (isLoading) {
    return (
      <Card className="relative mx-auto w-full pt-0">
        <Skeleton className="aspect-square w-full rounded-t-xl rounded-b-none" />
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2">
            <Skeleton className="h-11 w-36 rounded-xl" />
            <Skeleton className="h-11 w-20 rounded-xl" />
            <Skeleton className="h-11 w-28 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data || !data.game || !data.token) {
    return (
      <Card className="relative mx-auto w-full border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <HugeiconsIcon icon={Alert01Icon} size={16} />
            Could not load game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {error?.message ?? "There was an error reading this pasanaku from the blockchain."}
          </p>
        </CardContent>
      </Card>
    );
  }

  const { game, token } = data;
  const playerCount = game.participants.length;
  const amount = Number(formatUnits(game.amount, token.decimals));
  const title = `Pasanaku #${tokenId.toString()}`;

  return (
    <Card className="relative mx-auto w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-square bg-black/35" />
      <img
        src={data.tokenURI ?? "https://avatar.vercel.sh/shadcn1"}
        alt="Pasanaku image uri"
        className="relative z-20 aspect-square w-full object-cover brightness-60 grayscale dark:brightness-40"
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          {token && <TokenBadge token={token} amount={amount} participans={playerCount} />}
          <PlayerBadge count={playerCount} />
          {game.recovered && <RecoveredBadge />}
          {game.ended && <EndedBadge />}
        </div>
      </CardContent>
    </Card>
  );
}
