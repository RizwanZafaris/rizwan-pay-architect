type MetricLike = { label: string; value: string };

export function compactMetricValue(metric: MetricLike) {
  const { label, value } = metric;
  const countedList = value.match(/^(\d+(?:\.\d+)?)\s*\(/);
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

  if (value.length > 34) return `${value.slice(0, 31).replace(/\s+\S*$/, "")}...`;
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
