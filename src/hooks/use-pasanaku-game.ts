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

  const {
    data: tokenURI,
    isLoading: isLoadingTokenURI,
    isError: isErrorTokenURI,
    error: errorTokenURI,
  } = useReadContract({
    address: PASANAKU_ADDRESS,
    abi: pasanakuAbi,
    functionName: "uri",
    args: [tokenId],
  });

  const tokenFromList = useMemo(() => {
    if (!data) return undefined;
    if (!data.asset) return undefined;

    return TOKENS.find((token) => token.address.toLowerCase() === data.asset.toLowerCase());
  }, [data]);

  return {
    data: {
      game: data,
      token: tokenFromList,
      tokenURI,
    },
    isLoading: isLoading || isLoadingTokenURI,
    isError: isError || isErrorTokenURI,
    error: error || errorTokenURI,
  };
}
