export function formatFollowers(numberOfUsers) {
  return typeof numberOfUsers === "number"
    ? Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
      }).format(numberOfUsers)
    : "";
}
