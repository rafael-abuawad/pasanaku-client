import { EditableInput } from "@/components/common/editable-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { erc20Abi } from "@/lib/abi";
import type { Token } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BanIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { formatUnits } from "viem";
import { useConnection, useReadContract } from "wagmi";

export interface TokenInputProps {
  value: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  token: Token | null;
}

export function TokenInput({ value, onValueChange, token }: TokenInputProps) {
  const { address, isConnected } = useConnection();
  const [internalValue, setInternalValue] = useState<number>(value);
  const editableInputClassName =
    "text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground outline-none border-0 bg-transparent p-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none";

  const setValueToBalance = () => {
    setInternalValue(Number(balanceOf.data ?? 0));
    onValueChange?.(Number(balanceOf.data ?? 0));
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

  if (balanceOf.isLoading || decimals.isLoading) {
    return (
      <Field>
        <FieldLabel>Amount</FieldLabel>
        <Card className="border border border-input dark:border-white/10 ring-0">
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <EditableInput readOnly value={internalValue} className={editableInputClassName} />
              </div>

              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1 mt-1.5 h-1.5">
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Loading balance...</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Field>
    );
  }

  if (balanceOf.isError || decimals.isError) {
    return (
      <Field>
        <FieldLabel>Amount</FieldLabel>
        <Card className="border border border-input dark:border-white/10 ring-0">
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <EditableInput
                  value={internalValue}
                  onChange={(value) => setInternalValue(value)}
                  className={editableInputClassName}
                />
              </div>

              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1 mt-1.5 text-destructive h-1.5">
                  <BanIcon className="size-4" />
                  <span>Error loading balance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Field>
    );
  }

  return (
    <Field>
      <FieldLabel>Amount</FieldLabel>
      <Card className="border border border-input dark:border-white/10 ring-0">
        <CardContent>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <EditableInput
                value={internalValue}
                onChange={(value) => setInternalValue(value)}
                className={cn(
                  editableInputClassName,
                  internalValue > Number(balanceOf.data ?? 0) && "text-destructive",
                )}
              />
            </div>
            {token && (
              <div className="text-xs text-muted-foreground">
                Balance:{" "}
                <Button
                  variant="link"
                  size="xs"
                  onClick={setValueToBalance}
                  className="p-0"
                  disabled={balanceOf.isLoading}
                >
                  {balanceOf.isSuccess && decimals.isSuccess && (
                    <span>
                      {formatUnits(balanceOf.data ?? BigInt(0), decimals.data ?? 18)} {token.symbol}
                    </span>
                  )}
                </Button>
              </div>
            )}
            {token === null && (
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1 mt-1.5 h-1.5">
                  <span>Select a token to see your balance</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Field>
  );
}
