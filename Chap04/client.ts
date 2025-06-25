import { request } from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
};

const req = request(options, (res) => {
  res.setEncoding('utf8'); // res は IncomingMessage 型
  res.on('data', (chunk) => {
    console.log(`body: ${chunk}`);
  });
  res.on('end', () => {
    console.log('end');
  });
});

req.on('error', (e) => {
  console.error(`リクエストエラー: ${e.message}`);
});

req.end(); // リクエストを送信

// 実行コマンド
/*
npx ts-node src/index.ts
npx ts-node src/client.ts
*/