import { HugeiconsIcon } from "@hugeicons/react";
import { Coins01Icon, MoneySavingJarIcon } from "@hugeicons/core-free-icons";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
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

export function NoPasanakuGames() {
  const inlineCreateLink = (
    <Button className="p-0" variant="link" asChild>
      <Link to="/create">create</Link>
    </Button>
  );

  return (
    <section className="page-section flex flex-1 items-center">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 space-y-3">
            <p className="text-(--accent-warm-strong) text-sm font-medium tracking-[0.2em] uppercase">
              Dashboard
            </p>
            <h1 className="font-brand text-4xl leading-tight tracking-wide md:text-5xl">
              No rounds yet
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Start your first savings pool and invite participants to build momentum together.
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
                        <HugeiconsIcon icon={Coins01Icon} size={24} />
                      </EmptyMedia>
                    </motion.div>

                    <motion.div variants={itemMotion}>
                      <EmptyTitle className="font-brand text-3xl tracking-wide md:text-4xl">
                        No pasanaku games yet
                      </EmptyTitle>
                    </motion.div>

                    <motion.div variants={itemMotion}>
                      <EmptyDescription className="max-w-xl text-sm md:text-base">
                        Join or {inlineCreateLink} a game to see it listed here.
                      </EmptyDescription>
                    </motion.div>
                  </EmptyHeader>

                  <motion.div variants={itemMotion}>
                    <EmptyContent className="max-w-xl flex-row flex-wrap justify-center gap-3">
                      <Button
                        className="h-11 gap-2 text-sm font-semibold tracking-wide uppercase"
                        asChild
                      >
                        <Link to="/create">
                          <HugeiconsIcon icon={MoneySavingJarIcon} size={16} />
                          Create a round
                        </Link>
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
