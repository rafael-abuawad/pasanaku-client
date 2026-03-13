import { CoinsIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function NoPasanakuGames() {
  const createLink = (
    <Button className="p-0" variant="link" asChild>
      <Link to="/create">create</Link>
    </Button>
  );

  return (
    <section className="h-full flex-1 flex items-center justify-center">
      <Empty className="min-h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CoinsIcon />
          </EmptyMedia>
          <EmptyTitle>No pasanaku games yet</EmptyTitle>
          <EmptyDescription>Join or {createLink} a game to see it listed here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </section>
  );
}
