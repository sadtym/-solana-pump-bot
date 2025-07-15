// دریافت توکن‌های جدید و فعال از Dexscreener
import axios from 'axios';

export async function getNewTokensFromDexscreener() {
  // نمونه ساده: دریافت لیست توکن‌های جدید سولانا
  try {
    const res = await axios.get('https://api.dexscreener.com/latest/dex/tokens/solana');
    // فرض بر این که داده خروجی شامل آدرس و نماد است
    return res.data.pairs.map(pair => ({
      address: pair.baseToken.address,
      symbol: pair.baseToken.symbol
    }));
  } catch (e) {
    console.error('Dexscreener API Error:', e.message);
    return [];
  }
}
