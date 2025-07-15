// نقطه شروع ربات تلگرام
import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import { analyzeTokensAndSendAlerts } from './services/analyze.js';
import config from './config.js';

const bot = new TelegramBot(config.telegramToken, { polling: true });

// وظیفه زمان‌بندی شده برای بررسی توکن‌ها
cron.schedule(config.checkInterval, async () => {
  await analyzeTokensAndSendAlerts(bot, config);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'ربات فعال شد!');
});

export default bot;
