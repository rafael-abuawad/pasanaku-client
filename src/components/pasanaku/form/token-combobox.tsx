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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

// Token icons
import crvUsdIcon from "@/assets/images/tokens/crvUSD.svg";
import scrvUsdIcon from "@/assets/images/tokens/scrvUSD.svg";
import daiIcon from "@/assets/images/tokens/DAI.svg";
import mimIcon from "@/assets/images/tokens/MIM.svg";
import pyusdIcon from "@/assets/images/tokens/PYUSD.svg";
import usdsIcon from "@/assets/images/tokens/USDS.svg";
import susdsIcon from "@/assets/images/tokens/sUSDS.svg";
import usdcIcon from "@/assets/images/tokens/USDC.svg";
import usdt0Icon from "@/assets/images/tokens/USDT0.svg";
import type { Token } from "@/lib/types";

export const TOKENS: Token[] = [
  {
    symbol: "crvUSD",
    address: "0x498bf2b1e120fed3ad3d42ea2165e9b73f99c1e5",
    icon: crvUsdIcon,
    category: "stable",
  },
  {
    symbol: "scrvUSD",
    address: "0xEfB6601Df148677A338720156E2eFd3c5Ba8809d",
    icon: scrvUsdIcon,
    category: "yield",
  },
  {
    symbol: "DAI",
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    icon: daiIcon,
    category: "stable",
  },
  {
    symbol: "MIM",
    address: "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A",
    icon: mimIcon,
    category: "stable",
  },
  {
    symbol: "PYUSD",
    address: "0x46850aD61C2B7d64d08c9C754F45254596696984",
    icon: pyusdIcon,
    category: "stable",
  },
  {
    symbol: "USDS",
    address: "0x6491c05A82219b8D1479057361ff1654749b876b",
    icon: usdsIcon,
    category: "stable",
  },
  {
    symbol: "sUSDS",
    address: "0xdDb46999F8891663a8F2828d25298f70416d7610",
    icon: susdsIcon,
    category: "yield",
  },
  {
    symbol: "USDC",
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    icon: usdcIcon,
    category: "stable",
  },
  {
    symbol: "USDT0",
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    icon: usdt0Icon,
    category: "stable",
  },
];

const ARBISCAN_TOKEN_URL = "https://arbiscan.io/token";

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

      {selectedToken && (
        <FieldDescription className="text-xs">
          Token Address:{" "}
          <a
            href={`${ARBISCAN_TOKEN_URL}/${selectedToken.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedToken.address}
          </a>
        </FieldDescription>
      )}
    </Field>
  );
}
