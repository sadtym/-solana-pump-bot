// سرویس اصلی تحلیل و ارسال پیام
import { getNewTokensFromDexscreener } from './dexscreener.js';
import { getTokenDetailsFromBirdeye } from './birdeye.js';
import { filterTokens } from '../utils/filters.js';
import { saveAnalyzedToken, isTokenAnalyzed } from './cache.js';
import { getCandlestickChart } from './chart.js';

export async function analyzeTokensAndSendAlerts(bot, config) {
  try {
    const tokens = await getNewTokensFromDexscreener();
    for (const token of tokens) {
      if (await isTokenAnalyzed(token.address)) continue;
      const details = await getTokenDetailsFromBirdeye(token.address);
      if (!details) continue;
      const filtered = filterTokens(details, config.filters);
      if (!filtered) continue;
      const chartImage = await getCandlestickChart(token.address);
      const message = formatMessage(details, chartImage);
      await bot.sendPhoto(config.chatId, chartImage, { caption: message, parse_mode: 'HTML' });
      await saveAnalyzedToken(token.address);
    }
  } catch (e) {
    console.error('Analyze Error:', e);
  }
}

function formatMessage(details, chartImage) {
  // پیام حرفه‌ای با اطلاعات کامل
  return `<b>📈 Watchlist 🔍</b>\n#${details.symbol}\nریسک: ${details.risk}\nقیمت اولیه: ${details.priceStart}$\nقیمت فعلی: ${details.priceNow}$\nرشد: ${details.priceChange}%\nولاتیلیتی: ${details.volatility}%\nمارکت کپ: ${details.marketCap}$\nنقدینگی: ${details.liquidity}$\nحجم 24h: ${details.volume24h}$\nسن توکن: ${details.age}\nLP Lock: ${details.lpLock}%\nوضعیت ترید: ${details.tradeable ? '✅' : '❌'}\n<a href='${details.dexscreenerUrl}'>Dexscreener</a> | <a href='${details.birdeyeUrl}'>Birdeye</a>`;
}
