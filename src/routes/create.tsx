import { TokenInput } from "@/components/pasanaku/form/token-input";
import { TokenCombobox } from "@/components/pasanaku/form/token-combobox";
import { WalletAddressField } from "@/components/pasanaku/form/wallet-address-field";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Token } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, MoneySavingJarIcon } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

const formMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
    },
  },
};

const fieldsMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const fieldItemMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function RouteComponent() {
  const [token, setToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleCreate = () => {
    console.log(token, amount, addresses);
  };

  return (
    <section className="page-section flex-1">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 space-y-4">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-(--accent-warm-strong)">
              Start a new round
            </p>
            <h1 className="max-w-2xl font-brand text-4xl leading-tight tracking-wide md:text-5xl">
              Create a Pasanaku with intention
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Pick your token, set each contribution amount, and invite wallets for a fair rotating
              payout.
            </p>
          </div>

          <motion.div variants={formMotion} initial="hidden" animate="visible">
            <Card className="border bg-(--surface-warm)/65 shadow-[0_24px_80px_-42px_color-mix(in_oklab,var(--accent-warm-strong)_45%,transparent)] backdrop-blur-sm">
              <CardContent className="space-y-7 p-6 md:p-8">
                <FieldSet>
                  <FieldLegend className="font-brand text-2xl leading-none tracking-wide">
                    Round settings
                  </FieldLegend>

                  <motion.div variants={fieldsMotion} initial="hidden" animate="visible">
                    <FieldGroup className="gap-6">
                      <motion.div variants={fieldItemMotion}>
                        <TokenCombobox filters="all" onValueChange={setToken} />
                      </motion.div>

                      <motion.div variants={fieldItemMotion}>
                        <TokenInput token={token} value={amount} onValueChange={setAmount} />
                      </motion.div>

                      <motion.div variants={fieldItemMotion}>
                        <WalletAddressField value={addresses} onValueChange={setAddresses} />
                      </motion.div>

                      <motion.div variants={fieldItemMotion} className="flex flex-col gap-3 pt-2">
                        <Button size="lg" onClick={handleCreate}>
                          <HugeiconsIcon icon={MoneySavingJarIcon} size={16} />
                          Create round
                        </Button>

                        <Button variant="ghost" size="lg" asChild>
                          <Link to="/">
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                            Back to dashboard
                          </Link>
                        </Button>
                      </motion.div>
                    </FieldGroup>
                  </motion.div>
                </FieldSet>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
