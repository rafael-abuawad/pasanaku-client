"use client";

import { useState } from "react";
import { isAddress, getAddress } from "viem";
import { PlusIcon, XIcon, ExternalLinkIcon } from "lucide-react";

import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { ARBISCAN_ADDRESS_URL } from "@/lib/constants";
import { shortenAddress } from "@/lib/utils";

export interface WalletAddressFieldProps {
  value?: string[];
  onValueChange?: (addresses: string[]) => void;
  disabled?: boolean;
}

export function WalletAddressField({ value, onValueChange, disabled }: WalletAddressFieldProps) {
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addresses = value !== undefined ? value : internalValue;

  const updateAddresses = (next: string[]) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const handleAdd = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    if (!isAddress(trimmed)) {
      setError("Invalid Ethereum address");
      return;
    }

    const checksummed = getAddress(trimmed);

    if (addresses.some((a) => a.toLowerCase() === checksummed.toLowerCase())) {
      setError("Address already added");
      return;
    }

    updateAddresses([...addresses, checksummed]);
    setInput("");
    setError(null);
  };

  const handleRemove = (index: number) => {
    updateAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Field>
      <FieldLabel>Wallets</FieldLabel>

      <InputGroup className="border border-input dark:border-white/30">
        <InputGroupInput
          placeholder="0x..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-invalid={!!error}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            onClick={handleAdd}
            disabled={disabled || !input.trim()}
            aria-label="Add address"
          >
            <PlusIcon />
            Add
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {addresses.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {addresses.map((address, index) => (
            <Badge
              key={address}
              variant="outline"
              className="h-7 gap-1.5 pl-2.5 pr-1 font-mono text-xs"
            >
              <a
                href={`${ARBISCAN_ADDRESS_URL}/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                {shortenAddress(address)}
                <ExternalLinkIcon className="size-2.5" />
              </a>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                aria-label={`Remove ${shortenAddress(address)}`}
                className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/10 hover:text-destructive transition-colors disabled:pointer-events-none disabled:opacity-50"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <FieldDescription className="text-xs">
          Add wallet addresses to participate.
        </FieldDescription>
      )}
    </Field>
  );
}
