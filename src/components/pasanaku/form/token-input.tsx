import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { erc20Abi } from "@/lib/abi";
import type { Token } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShieldBanIcon, LoaderPinwheelIcon } from "@hugeicons/core-free-icons";
import { useMemo } from "react";
import { useConnection, useReadContract } from "wagmi";

export interface TokenInputProps {
  value: number;
  onValueChange: (value: number) => void;
  token: Token | null;
}

export function TokenInput({ value, onValueChange, token }: TokenInputProps) {
  const { address, isConnected } = useConnection();

  const setValueToBalance = () => {
    onValueChange(Number(balanceOf.data ?? 0));
  };

  const balanceOf = useReadContract({
    address: token?.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  const decimals = useReadContract({
    address: token?.address,
    abi: erc20Abi,
    functionName: "decimals",
  });

  const formattedBalance = useMemo(() => {
    return Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(balanceOf.data ?? 0) / 10 ** (decimals.data ?? 18));
  }, [balanceOf.data, decimals.data]);

  const dataIsLoading = balanceOf.isLoading || decimals.isLoading;
  const dataIsError = balanceOf.isError || decimals.isError;

  return (
    <Field>
      <FieldLabel>Amount</FieldLabel>
      <Input
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        type="number"
        min={0}
        max={Number(formattedBalance)}
      />
      {dataIsLoading && (
        <FieldDescription>
          <div className="flex items-center gap-1">
            <HugeiconsIcon icon={LoaderPinwheelIcon} size={16} className="animate-spin" /> Loading
            balance...
          </div>
        </FieldDescription>
      )}
      {dataIsError && (
        <FieldError>
          <HugeiconsIcon icon={ShieldBanIcon} size={16} /> Error loading balance
        </FieldError>
      )}
      {!dataIsLoading && !dataIsError && token && (
        <FieldDescription>
          Balance:{" "}
          <Button
            variant="link"
            size="xs"
            onClick={setValueToBalance}
            className="p-0"
            disabled={balanceOf.isLoading}
          >
            {formattedBalance} {token.symbol}
          </Button>
        </FieldDescription>
      )}
      {!dataIsLoading && !dataIsError && token === null && (
        <FieldDescription>Select a token to see your balance</FieldDescription>
      )}
    </Field>
  );
}
