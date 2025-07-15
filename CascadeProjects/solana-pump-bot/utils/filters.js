// فیلتر فرصت‌های مناسب بر اساس config
export function filterTokens(details, filters) {
  if (details.priceChange < filters.priceChange1h) return false;
  if (details.volume24h < filters.minVolume24h) return false;
  if (details.liquidity < filters.minLiquidity) return false;
  if (details.lpLock < filters.minLpLock) return false;
  if (!filters.allowHoneypot && !details.tradeable) return false;
  return true;
}
