import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.static('public'));

// API endpoint: دریافت توکن‌های پامپ‌شده اخیر
app.get('/api/tokens', (req, res) => {
  try {
    // داده‌های کش‌شده توکن‌های تحلیل‌شده
    const cache = JSON.parse(fs.readFileSync('./cache.json', 'utf-8'));
    const allTokens = JSON.parse(fs.readFileSync('./market_data.json', 'utf-8'));
    // فقط توکن‌هایی که در کش هستند
    const tokens = allTokens.filter(t => cache.analyzed.includes(t.address));
    res.json(tokens);
  } catch (e) {
    res.status(500).json({ error: 'خطا در خواندن داده‌ها' });
  }
});

app.listen(PORT, () => {
  console.log(`Dashboard running: http://localhost:${PORT}`);
});
