// سرویس تحلیل بلاک‌چین سولانا (در صورت نیاز به اطلاعات تکمیلی)
import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_RPC);

export async function getTokenAge(address) {
  try {
    const pubkey = new PublicKey(address);
    const info = await connection.getAccountInfo(pubkey);
    if (!info) return '-';
    const now = Date.now() / 1000;
    const ageSeconds = now - info.lamports; // مثال فرضی، باید بر اساس داده واقعی تنظیم شود
    return `${Math.floor(ageSeconds / 3600)} ساعت`;
  } catch (e) {
    return '-';
  }
}
