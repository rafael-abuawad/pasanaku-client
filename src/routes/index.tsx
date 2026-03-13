import { GameCard } from "@/components/pasanaku/game-card";
import { NoWalletConnected } from "@/components/common/no-wallet-connected";
import { NoPasanakuGames } from "@/components/common/no-pasanaku-games";
import { PasanakuError } from "@/components/common/pasanaku-error";
import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { useConnection } from "wagmi";
import { usePasanakuBalance } from "@/hooks/use-pasanaku-balance";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isConnected, address } = useConnection();
  const { data, isLoading, isError, error } = usePasanakuBalance(address);
  const { tokenIds } = data ?? {};

  if (!isConnected) {
    return <NoWalletConnected />;
  }

  if (isLoading) {
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-full min-h-64 aspect-square" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return <PasanakuError error={error} />;
  }

  if (tokenIds?.length === 0) {
    return <NoPasanakuGames />;
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokenIds.map((tokenId) => (
          <GameCard key={tokenId.toString()} tokenId={tokenId} />
        ))}
      </div>
    </section>
  );
}
