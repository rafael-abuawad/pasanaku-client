import { GameCard } from "@/components/pasanaku/game-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <GameCard key={index} />
        ))}
      </div>
    </section>
  );
}
