import { TokenInput } from "@/components/pasanaku/form/token-input";
import { TokenCombobox } from "@/components/pasanaku/form/token-combobox";
import { WalletAddressField } from "@/components/pasanaku/form/wallet-address-field";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Token } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [token, setToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleCreate = () => {
    console.log(token, amount, addresses);
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <FieldSet>
        <FieldGroup>
          <TokenCombobox filters="all" onValueChange={setToken} />

          <TokenInput token={token} value={amount} onValueChange={setAmount} />

          <WalletAddressField value={addresses} onValueChange={setAddresses} />

          <Button className="w-full" size="lg" onClick={handleCreate}>
            Create
          </Button>
        </FieldGroup>
      </FieldSet>
    </section>
  );
}
