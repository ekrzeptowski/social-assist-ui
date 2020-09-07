export function formatFollowers(numberOfUsers) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1
    }).format(numberOfUsers);
  }