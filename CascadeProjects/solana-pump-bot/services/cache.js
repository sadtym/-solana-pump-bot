// ذخیره و بررسی توکن‌های تحلیل‌شده با lowdb
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adapter = new JSONFile('./cache.json');
const db = new Low(adapter, { analyzed: [] });

async function initDB() {
  await db.read();
  if (!db.data || !db.data.analyzed) {
    db.data = { analyzed: [] };
    await db.write();
  }
}

export async function saveAnalyzedToken(address) {
  await initDB();
  if (!db.data.analyzed.includes(address)) {
    db.data.analyzed.push(address);
    await db.write();
  }
}

export async function isTokenAnalyzed(address) {
  await initDB();
  return db.data.analyzed.includes(address);
}

