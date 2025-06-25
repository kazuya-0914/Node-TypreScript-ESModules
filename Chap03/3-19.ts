import { request } from 'undici';
import { text } from 'stream/consumers';

const res = await request('https://www.yahoo.co.jp');

if (!res.body) {
  throw new Error('レスポンスに body がありません');
}

const bodyText = await text(res.body);
console.log(bodyText);