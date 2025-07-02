import express from 'express';
import apiRouter from './api.js';

const app = express();

app.use(express.json());

// ルーティング登録
app.get('/', (req, res) => {
  res.send('Welcome to the root endpoint!');
});

app.use('/api', apiRouter); // → /api/foo, /api/bar に対応

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});


// 実行コマンド
/*
npx tsc
npx tsc src/server.ts src/api.ts --outDir dist
node dist/server.js
*/
