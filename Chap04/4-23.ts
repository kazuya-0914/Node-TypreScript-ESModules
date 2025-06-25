import { request } from 'undici';
console.time('req');
const reqs = [];

for (let i = 0; i < 10; i++) {
  const req = request('http://localhost:8000').then(res => res.body.text());
  reqs.push(req);
}

await Promise.all(reqs);
console.timeEnd('req');

// 実行コマンド
/*
npx ts-node src/index.ts
npx ts-node src/server.ts
npx ts-node src/server-top-level-await.ts
*/