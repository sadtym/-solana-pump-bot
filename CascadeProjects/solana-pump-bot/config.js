export default {
  telegramToken: '7814885096:AAG89mrt4xxT2eoTRvWX1eFnpby-bg4Jwf0',
  chatId: '6995670840',
  filters: {
    priceChange1h: 30, // درصد رشد 1 ساعته
    minVolume24h: 10000, // حداقل حجم معاملات 24 ساعته (دلار)
    minLiquidity: 5000, // حداقل نقدینگی (دلار)
    minLpLock: 80, // درصد قفل بودن LP
    allowHoneypot: false // فقط توکن‌های قابل ترید
  },
  checkInterval: '*/1 * * * *' // هر 1 دقیقه (برای تست)
};
