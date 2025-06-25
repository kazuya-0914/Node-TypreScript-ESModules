import { createServer } from "http";
const server = createServer();

server.on('request', (req, res) => {
  setTimeout(() => {
    res.end('hello');
  }, 100);
});
server.listen(8000);

// 実行コマンド
/*
npx ts-node src/index.ts
npx ts-node src/server.ts
*/