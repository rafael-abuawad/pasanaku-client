"use client";

import { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";
import type { Token } from "@/lib/types";
import { TOKENS } from "@/lib/constants";

export interface TokenComboboxProps {
  value?: Token | null;
  onValueChange?: (token: Token | null) => void;
  disabled?: boolean;
  filters?: "all" | "yield" | "stable";
}

export function TokenCombobox({
  value,
  onValueChange,
  disabled,
  filters = "all",
}: TokenComboboxProps) {
  const [internalValue, setInternalValue] = useState<Token | null>(null);
  const selectedToken = value !== undefined ? value : internalValue;
  const tokens = useMemo(() => {
    return TOKENS.filter((token) => {
      if (filters === "all") {
        return true;
      }
      return token.category === filters;
    });
  }, [filters]);

  const handleValueChange = (newValue: Token | null) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <Field>
      <FieldLabel>Token</FieldLabel>
      <Combobox
        value={selectedToken}
        onValueChange={handleValueChange}
        items={tokens}
        itemToStringLabel={(token: Token) => token.symbol}
        itemToStringValue={(token: Token) => token.symbol}
      >
        <ComboboxInput placeholder="Search tokens..." showClear showTrigger disabled={disabled}>
          {selectedToken && (
            <InputGroupAddon align="inline-start">
              <div className="w-5 h-5 bg-white/20 rounded-full">
                <img src={selectedToken.icon} alt="" className="size-5 rounded-full" />
              </div>
            </InputGroupAddon>
          )}
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>No tokens found</ComboboxEmpty>
          <ComboboxList>
            {(token: Token) => (
              <ComboboxItem key={token.symbol} value={token} className="py-1.5">
                <div className="w-5 h-5 bg-white/20 rounded-full">
                  <img
                    src={token.icon}
                    alt={token.symbol}
                    className="size-5 shrink-0 rounded-full"
                  />
                </div>
                <span>{token.symbol}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
