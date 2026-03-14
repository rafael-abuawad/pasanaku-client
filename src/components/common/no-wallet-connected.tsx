import { HugeiconsIcon } from "@hugeicons/react";
import { Wallet01Icon } from "@hugeicons/core-free-icons";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { motion } from "framer-motion";

const containerMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export function NoWalletConnected() {
  return (
    <section className="page-section flex flex-1 items-center">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 space-y-3">
            <p className="text-(--accent-warm-strong) text-sm font-medium tracking-[0.2em] uppercase">
              Get started
            </p>
            <h1 className="font-brand text-4xl leading-tight tracking-wide md:text-5xl">
              Connect your wallet
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Join community-powered savings rounds and track your contributions directly onchain.
            </p>
          </div>

          <motion.div variants={containerMotion} initial="hidden" animate="visible">
            <Card className="border bg-(--surface-warm)/65 shadow-[0_24px_80px_-42px_color-mix(in_oklab,var(--accent-warm-strong)_45%,transparent)] backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <Empty className="min-h-0 gap-6 border-0 p-0">
                  <EmptyHeader className="max-w-2xl gap-3">
                    <motion.div variants={itemMotion}>
                      <EmptyMedia
                        variant="icon"
                        className="size-12 rounded-2xl bg-(--accent-warm-strong)/18 text-(--accent-warm-strong) [&_svg]:size-6"
                      >
                        <HugeiconsIcon icon={Wallet01Icon} size={24} />
                      </EmptyMedia>
                    </motion.div>

                    <motion.div variants={itemMotion}>
                      <EmptyTitle className="font-brand text-3xl tracking-wide md:text-4xl">
                        No wallet connected
                      </EmptyTitle>
                    </motion.div>

                    <motion.div variants={itemMotion}>
                      <EmptyDescription className="max-w-xl text-sm md:text-base">
                        Pasanaku is an onchain group savings game where participants contribute to a
                        shared pool and take turns receiving payouts. Connect your wallet to view
                        and join available rounds.
                      </EmptyDescription>
                    </motion.div>
                  </EmptyHeader>

                  <motion.div variants={itemMotion}>
                    <EmptyContent className="max-w-xl flex-row flex-wrap justify-center gap-3">
                      <ConnectKitButton.Custom>
                        {({ isConnecting, show }) => (
                          <Button onClick={show} disabled={isConnecting} size="lg">
                            <HugeiconsIcon icon={Wallet01Icon} size={16} />
                            {isConnecting ? "Connecting..." : "Connect Wallet"}
                          </Button>
                        )}
                      </ConnectKitButton.Custom>
                      <Button variant="outline" size="lg" asChild>
                        <a
                          href="https://en.wikipedia.org/wiki/Tanda_(informal_loan_club)"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Learn more
                        </a>
                      </Button>
                    </EmptyContent>
                  </motion.div>
                </Empty>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
