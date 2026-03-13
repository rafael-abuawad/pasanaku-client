import type { ReactNode } from "react";

const COMPACT_THRESHOLDS: [number, string][] = [
  [1_000_000_000_000_000, "Q"],
  [1_000_000_000_000, "T"],
  [1_000_000_000, "B"],
  [1_000_000, "M"],
  [1_000, "K"],
];

const SUBSCRIPT_DIGITS = "₀₁₂₃₄₅₆₇₈₉";

interface FormatCompactNumberOptions {
  maxFractionDigits?: number;
  significantDigits?: number;
}

/**
 * Formats a number as JSX with compact suffixes for large values (K/M/B/T)
 * and zero-count subscript notation for very small decimals.
 *
 * Examples:
 *  - 1500       → "1.5K"
 *  - 2300000    → "2.3M"
 *  - 0.00000012 → 0.0₅12  (subscript = leading zeros minus the one shown)
 *  - 42.5       → "42.5"
 */
export function formatCompactNumber(
  value: number | string,
  options: FormatCompactNumberOptions = {},
): ReactNode {
  const { maxFractionDigits = 2, significantDigits = 4 } = options;
  const num = typeof value === "string" ? Number(value) : value;

  if (!Number.isFinite(num)) return String(num);
  if (num === 0) return "0";

  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  for (const [threshold, suffix] of COMPACT_THRESHOLDS) {
    if (abs >= threshold) {
      const scaled = abs / threshold;
      const formatted = scaled.toFixed(maxFractionDigits).replace(/\.?0+$/, "");
      return `${sign}${formatted}${suffix}`;
    }
  }

  if (abs < 0.001) {
    return formatSmallNumber(abs, sign, significantDigits);
  }

  const formatted = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  }).format(abs);

  return `${sign}${formatted}`;
}

function formatSmallNumber(abs: number, sign: string, significantDigits: number): ReactNode {
  const decimalStr = abs.toFixed(20);
  const afterDot = decimalStr.split(".")[1] ?? "";

  let leadingZeros = 0;
  for (const ch of afterDot) {
    if (ch === "0") leadingZeros++;
    else break;
  }

  const significant = afterDot
    .slice(leadingZeros, leadingZeros + significantDigits)
    .replace(/0+$/, "");
  const subscript = toSubscript(leadingZeros - 1);

  return (
    <span>
      {sign}0.0{subscript}
      {significant}
    </span>
  );
}

function toSubscript(n: number): string {
  return String(n)
    .split("")
    .map((d) => SUBSCRIPT_DIGITS[Number(d)])
    .join("");
}
