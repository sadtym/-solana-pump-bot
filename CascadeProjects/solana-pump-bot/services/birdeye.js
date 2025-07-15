// دریافت و تحلیل داده توکن از Birdeye
import axios from 'axios';

export async function getTokenDetailsFromBirdeye(address) {
  try {
    const res = await axios.get(`https://public-api.birdeye.so/public/token/${address}`);
    const data = res.data.data;
    // نمونه تبدیل داده به ساختار مورد نیاز
    return {
      address,
      symbol: data.symbol,
      priceStart: data.priceChange1h?.open ?? 0,
      priceNow: data.price ?? 0,
      priceChange: data.priceChange1h?.percent ?? 0,
      marketCap: data.market_cap ?? 0,
      liquidity: data.liquidity ?? 0,
      volume24h: data.volume_24h ?? 0,
      volatility: data.volatility ?? 0,
      age: data.age ?? '-',
      tradeable: !data.honeypot,
      lpLock: data.lp_lock_percent ?? 0,
      risk: data.risk_level ?? 'نامشخص',
      dexscreenerUrl: `https://dexscreener.com/solana/${address}`,
      birdeyeUrl: `https://birdeye.so/token/${address}`
    };
  } catch (e) {
    console.error('Birdeye API Error:', e.message);
    return null;
  }
}
