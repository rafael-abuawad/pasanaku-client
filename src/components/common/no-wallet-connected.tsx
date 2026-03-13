import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function NoWalletConnected() {
  return (
    <section className="h-full flex-1 flex items-center justify-center">
      <Empty className="min-h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Wallet />
          </EmptyMedia>
          <EmptyTitle>No wallet connected</EmptyTitle>
          <EmptyDescription>
            Pasanaku is an onchain group savings game where participants contribute to a shared pool
            and take turns receiving payouts. Connect your wallet to view and join available rounds.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <ConnectKitButton.Custom>
            {({ isConnecting, show }) => (
              <Button onClick={show} disabled={isConnecting}>
                <Wallet />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </ConnectKitButton.Custom>
          <Button variant="outline" asChild>
            <a
              href="https://en.wikipedia.org/wiki/Tanda_(informal_loan_club)"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  );
}
