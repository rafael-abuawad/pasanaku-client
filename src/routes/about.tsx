import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const blockMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const pageMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

function AboutPage() {
  return (
    <section className="page-section flex-1">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <motion.div
          className="mx-auto max-w-4xl space-y-10"
          variants={pageMotion}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-4" variants={blockMotion}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-(--accent-warm-strong)">
              About Pasanaku
            </p>
            <h1 className="max-w-3xl font-brand text-4xl leading-tight tracking-wide md:text-5xl">
              Rotating savings onchain, built for trusted circles
            </h1>
            <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
              Pasanaku is a rotating savings protocol where participants pool the same contribution
              each round and take turns receiving the full pot. No new money is created. It is a
              structured rotation of shared savings.
            </p>
          </motion.div>

          <motion.div variants={blockMotion}>
            <Card className="border bg-(--surface-warm)/65 shadow-[0_24px_80px_-42px_color-mix(in_oklab,var(--accent-warm-strong)_45%,transparent)] backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-brand text-2xl tracking-wide">
                  What is rotating savings?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground md:text-base">
                <p>
                  Everyone commits to the same contribution amount each round, for example 100 USDC.
                  In every round, one participant receives the full pot made from the group
                  contributions.
                </p>
                <p>
                  The recipient rotates round by round until everyone has received once. You are not
                  earning yield. You are taking turns getting a larger lump sum from the same pool
                  of savings.
                </p>
                <p>
                  Example flow: if a game has 10 participants and the contribution is 100 USDC, one
                  participant receives 1,000 USDC in their round.
                </p>
                <p>
                  Over 10 months, each participant contributes during 9 months and receives once.
                  The value is in timing and coordination, not in creating extra money.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={blockMotion}>
            <Card className="border bg-background/70">
              <CardContent className="p-0">
                <Collapsible defaultOpen className="border-b">
                  <CollapsibleTrigger className="group flex w-full items-center justify-between px-6 py-5 text-left">
                    <span className="font-brand text-2xl tracking-wide md:text-3xl">
                      How to participate
                    </span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6">
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <h3 className="font-semibold">1. Join a trusted game</h3>
                        <p className="text-sm text-muted-foreground md:text-base">
                          A creator chooses the token, fixed contribution amount, and participant
                          list (up to 12 addresses).
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-semibold">2. Contribute each round</h3>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Rounds are monthly. If you are not the current recipient, you deposit the
                          fixed amount for that round.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-semibold">3. Claim when it is your turn</h3>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Once everyone else has deposited, the current recipient claims the full
                          pot and the game advances to the next recipient.
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="border-b">
                  <CollapsibleTrigger className="group flex w-full items-center justify-between px-6 py-5 text-left">
                    <span className="font-brand text-2xl tracking-wide md:text-3xl">
                      Trust model
                    </span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 px-6 pb-6 text-sm text-muted-foreground md:text-base">
                    <p>
                      Pasanaku works best with trusted participants. The smart contract cannot force
                      a participant to keep paying in future rounds after they already received.
                    </p>
                    <p>
                      Join games only with people who are committed to honoring the full schedule.
                    </p>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger className="group flex w-full items-center justify-between px-6 py-5 text-left">
                    <span className="font-brand text-2xl tracking-wide md:text-3xl">
                      How to create your own
                    </span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 px-6 pb-6 text-sm text-muted-foreground md:text-base">
                    <p>
                      To create a game, choose the ERC-20 token, set a fixed contribution amount,
                      and add the participant wallets. Pasanaku then tracks deposits, claims, and
                      recovery options if a round gets stuck.
                    </p>
                    <p>
                      Verified contract on Arbitrum:{" "}
                      <a
                        className="underline decoration-(--accent-warm-strong)/60 underline-offset-4"
                        href="https://arbitrum.blockscout.com/address/0x530a4cBdC461181519E5459309411710e8C23EE6?tab=contract_code"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        0x530a4cBdC461181519E5459309411710e8C23EE6
                      </a>
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 border-t pt-8 sm:flex-row"
            variants={blockMotion}
          >
            <Button asChild>
              <Link to="/">Participate from dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/create">Create a game</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
