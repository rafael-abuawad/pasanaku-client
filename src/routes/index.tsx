import { GameCard } from "@/components/pasanaku/game-card";
import { NoWalletConnected } from "@/components/common/no-wallet-connected";
import { NoPasanakuGames } from "@/components/common/no-pasanaku-games";
import { PasanakuError } from "@/components/common/pasanaku-error";
import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useConnection } from "wagmi";
import { usePasanakuBalance } from "@/hooks/use-pasanaku-balance";

export const Route = createFileRoute("/")({
  component: Index,
});

const listMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

function Index() {
  const { isConnected, address } = useConnection();
  const { data, isLoading, isError, error } = usePasanakuBalance(address);
  const { tokenIds } = data ?? {};

  if (!isConnected) {
    return <NoWalletConnected />;
  }

  if (isLoading) {
    return (
      <section className="page-section flex-1">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10 max-w-2xl space-y-3">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-(--accent-warm-strong)">
              Dashboard
            </p>
            <h1 className="font-brand text-4xl leading-tight tracking-wide md:text-5xl">
              Your rounds
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Loading your active and completed Pasanaku games from the blockchain.
            </p>
          </div>

          <motion.div
            className="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
            variants={listMotion}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={index} variants={cardMotion}>
                <Skeleton className="aspect-square min-h-64 w-full rounded-2xl shadow-sm" />
              </motion.div>
            ))}
          </motion.div>
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
    <section className="page-section flex-1">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-(--accent-warm-strong)">
            Dashboard
          </p>
          <h1 className="font-brand text-4xl leading-tight tracking-wide md:text-5xl">
            Your rounds
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            Track each pool, spot recovered rounds, and jump back in when the next payout is yours.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          variants={listMotion}
          initial="hidden"
          animate="visible"
        >
          {tokenIds.map((tokenId) => (
            <motion.div key={tokenId.toString()} variants={cardMotion}>
              <GameCard tokenId={tokenId} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
