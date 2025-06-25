import { createServer } from "http";
import { on } from 'events';
import { setTimeout } from "timers/promises";

const server = createServer();

const req = on(createServer().listen(8000), 'request');

for await (const [, res] of req) {
  await setTimeout(100);
  res.end('hello');
}

// 実行コマンド
/*
npx ts-node src/index.ts
npx ts-node src/server-top-level-await.ts
*/