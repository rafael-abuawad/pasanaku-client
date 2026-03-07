import { EditableInput } from "@/components/common/editable-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import type { Token } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface TokenInputProps {
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  token: Token | null;
}

export function TokenInput({ value, onValueChange, token }: TokenInputProps) {
  const balance = 100;
  const [internalValue, setInternalValue] = useState<number>(0);

  const setValueToBalance = () => {
    setInternalValue(balance);
    onValueChange?.(balance);
  };

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
                  "text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground outline-none border-0 bg-transparent p-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none",
                  value && value > balance && "text-destructive",
                )}
              />
            </div>
            {token && (
              <div className="text-xs text-muted-foreground">
                Balance:{" "}
                <Button
                  variant="link"
                  size="xs"
                  className="p-0 text-muted-foreground hover:text-foreground hover:cursor-pointer underline"
                  onClick={setValueToBalance}
                >
                  {balance} {token.symbol}
                </Button>
              </div>
            )}
            {token === null && (
              <div className="text-xs text-muted-foreground">
                Select a token to see your balance
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Field>
  );
}
