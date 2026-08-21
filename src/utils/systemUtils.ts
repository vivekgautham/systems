import { SystemCategory } from "../types/system";

export function formatStars(stars?: number): string {
  if (!stars) return "0";
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return stars.toLocaleString();
}

export function getCategoryColor(
  category: SystemCategory,
): "primary" | "secondary" | "success" | "warning" | "info" | "default" {
  switch (category) {
    case "Databases":
      return "primary";
    case "Distributed Systems":
      return "secondary";
    case "Message Brokers":
      return "info";
    case "Compute & Orchestration":
      return "warning";
    case "Observability":
      return "success";
    case "Networking":
      return "info";
    case "Storage":
      return "primary";
    case "Frameworks & Runtimes":
      return "secondary";
    case "Security":
      return "warning";
    default:
      return "default";
  }
}
