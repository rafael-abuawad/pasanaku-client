"use client";

import { useMemo } from "react";
import { useReadContract } from "wagmi";
import { pasanakuAbi } from "@/lib/abi";
import { PASANAKU_ADDRESS, TOKENS } from "@/lib/constants";

export function useReadPasanakuGame(tokenId: bigint) {
  const { data, isLoading, isError, error } = useReadContract({
    address: PASANAKU_ADDRESS,
    abi: pasanakuAbi,
    functionName: "rotating_savings",
    args: [tokenId],
  });

  console.log("useReadPasanakuGame", tokenId);
  console.log({
    data,
    isLoading,
    isError,
    error,
  });

  const tokenFromList = useMemo(() => {
    if (!data) return undefined;
    if (!data.asset) return undefined;

    return TOKENS.find((token) => token.address.toLowerCase() === data.asset.toLowerCase());
  }, [data]);

  console.log("tokenFromList", tokenFromList);
  console.log({
    data: {
      game: data,
      token: tokenFromList,
    },
    isLoading,
    isError,
    error,
  });

  return {
    data: {
      game: data,
      token: tokenFromList,
    },
    isLoading,
    isError,
    error,
  };
}
