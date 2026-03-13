"use client";

import { useReadContract } from "wagmi";
import { pasanakuAbi } from "@/lib/abi";
import { PASANAKU_ADDRESS } from "@/lib/constants";
import type { Address } from "viem";

const BATCH_SIZE = 100;

/**
 * Discovers token IDs where the given address has balance > 0.
 * Uses next_token_id() from the contract as the upper bound, then
 * balanceOfBatch for IDs [0, min(next_token_id, BATCH_SIZE)).
 */
export function usePasanakuBalance(address: `0x${string}` | undefined) {
  const {
    data: nextId,
    isLoading: isLoadingNextId,
    isError: isErrorNextId,
    error: errorNextId,
  } = useReadContract({
    address: PASANAKU_ADDRESS,
    abi: pasanakuAbi,
    functionName: "next_token_id",
  });

  const count = nextId != null ? Math.min(Number(nextId), BATCH_SIZE) : 0;
  const owners = address && count > 0 ? (Array(count).fill(address) as Address[]) : [];
  const ids = Array.from({ length: count }, (_, i) => BigInt(i));

  const {
    data: balances,
    isLoading: isLoadingBalances,
    isError: isErrorBalances,
    error: errorBalances,
  } = useReadContract({
    address: PASANAKU_ADDRESS,
    abi: pasanakuAbi,
    functionName: "balanceOfBatch",
    args: address && ids.length > 0 ? [owners, ids] : undefined,
  });

  const tokenIds: bigint[] = [];
  if (balances && address) {
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] > BigInt(0)) tokenIds.push(BigInt(i));
    }
  }

  return {
    data: {
      tokenIds,
      balances,
      nextTokenId: nextId,
    },
    isLoading: isLoadingNextId || isLoadingBalances,
    isError: isErrorNextId || isErrorBalances,
    error: errorNextId || errorBalances,
  };
}
