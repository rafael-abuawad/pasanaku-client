import { TokenInput } from "@/components/pasanaku/form/token-input";
import { TokenCombobox } from "@/components/pasanaku/form/token-combobox";
import { WalletAddressField } from "@/components/pasanaku/form/wallet-address-field";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Token } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [token, setToken] = useState<Token | null>(null);
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex gap-3 flex-col">
        <TokenInput token={token} />
        <TokenCombobox filters="all" onValueChange={setToken} />
        <WalletAddressField />
        <Button className="w-full" size="lg">
          Create
        </Button>
      </div>
    </section>
  );
}
