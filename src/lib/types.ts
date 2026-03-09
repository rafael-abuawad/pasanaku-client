import type { Address } from "viem";

export type Token = {
  symbol: string;
  address: Address;
  icon: string;
  category: "yield" | "stable";
  decimals: number;
};
