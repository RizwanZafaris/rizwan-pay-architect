type MetricLike = { label: string; value: string };

/** Longest value a KPI tile can hold before it stops reading as a number. */
export const COMPACT_METRIC_MAX = 34;

/** True when the compacted value is short enough for the display-serif tile. */
export function isCompactMetric(value: string) {
  return value.length <= COMPACT_METRIC_MAX;
}

/**
 * Reduce a metric's prose value to its numeric lede.
 *
 * It NEVER truncates with an ellipsis. It used to: the final branch was
 * `value.slice(0, 31) + "..."`, which shipped literal "..." into giant serif
 * KPI tiles on flagship case-study heroes — e.g.
 *   "Routed wallet traffic ~38% cheaper than international scheme equivalent"
 * rendered as "Routed wallet traffic ~38%...". A KPI that trails off is worse
 * than a KPI that wraps, and far worse than one the caller can style down.
 *
 * When no rule matches, the full value is returned unharmed. Callers decide how
 * to present it: the wrapping tiles on the detail page render it as-is, and the
 * display-serif tile on the index drops a type step via `isCompactMetric`.
 */
export function compactMetricValue(metric: MetricLike) {
  const { label } = metric;

  // Drop a trailing parenthetical gloss: it is always a restatement, never the
  // number. "~40k (issuance, reissuance, lifecycle, suspend)" -> "~40k".
  const value = metric.value.replace(/\s*\([^)]*\)\s*$/, "").trim();

  // A counted list: "5 (Easypaisa, JazzCash, ...)" -> "5 rails".
  // Leading `~`/`>`/`+` allowed — the old regex demanded a bare digit, so every
  // approximate count ("~40k (…)") fell through to the ellipsis branch.
  const countedList = metric.value.match(/^([~><+]?\d+(?:\.\d+)?[a-z]*)\s*\(/i);
  if (countedList) return `${countedList[1]} ${metricNoun(label)}`;

  const days = value.match(/^Cut from ~?(\d+) days to ~?(\d+) days/i);
  if (days) return `~${days[1]}d -> ~${days[2]}d`;

  const cheaper = value.match(/^Routed wallet traffic ~?(\d+)% cheaper/i);
  if (cheaper) return `~${cheaper[1]}% cheaper`;

  const fallback = value.match(/^(\d+)% of failed-card-attempt/i);
  if (fallback) return `${fallback[1]}% fallback`;

  if (value.startsWith("MT103")) return "6 message types";
  if (value.startsWith("OFAC,")) return "7+ lists";
  if (value.startsWith("Scheme file + bank statement + internal ledger")) return "3-way match";

  // A leading clause before `;` is the claim; what follows is elaboration.
  // "Single register; programmes + risks cross-linked" -> "Single register".
  const [firstClause] = value.split(";");
  if (firstClause && isCompactMetric(firstClause.trim())) return firstClause.trim();

  // Nothing matched. Hand back the truth and let the caller size it.
  return value;
}

function metricNoun(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("wallet")) return "wallets";
  if (normalized.includes("market")) return "markets";
  if (normalized.includes("corridor")) return "corridors";
  if (normalized.includes("workstream")) return "workstreams";
  if (normalized.includes("merchant")) return "merchants";
  if (normalized.includes("programme") || normalized.includes("program")) return "programmes";
  if (normalized.includes("issuer")) return "issuer sets";
  if (normalized.includes("list")) return "lists";
  if (normalized.includes("rail")) return "rails";
  return normalized.split(/\s+/)[0] || "items";
}
