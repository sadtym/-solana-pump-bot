// تحلیل آفلاین توکن‌ها از روی فایل market_data.json و نمایش نتیجه در کنسول
import fs from 'fs';
import config from './config.js';
import { filterTokens } from './utils/filters.js';

const data = JSON.parse(fs.readFileSync('./market_data.json', 'utf-8'));

console.log('--- تحلیل آفلاین توکن‌ها ---');
let found = false;
for (const details of data) {
  if (filterTokens(details, config.filters)) {
    found = true;
    console.log(`\n📈 Watchlist 🔍\n#${details.symbol}`);
    console.log(`ریسک: ${details.risk}`);
    console.log(`قیمت اولیه: ${details.priceStart}$`);
    console.log(`قیمت فعلی: ${details.priceNow}$`);
    console.log(`رشد: ${details.priceChange}%`);
    console.log(`ولاتیلیتی: ${details.volatility}%`);
    console.log(`مارکت کپ: ${details.marketCap}$`);
    console.log(`نقدینگی: ${details.liquidity}$`);
    console.log(`حجم 24h: ${details.volume24h}$`);
    console.log(`سن توکن: ${details.age}`);
    console.log(`LP Lock: ${details.lpLock}%`);
    console.log(`وضعیت ترید: ${details.tradeable ? '✅' : '❌'}`);
  }
}
if (!found) {
  console.log('هیچ توکن مناسبی یافت نشد.');
}
