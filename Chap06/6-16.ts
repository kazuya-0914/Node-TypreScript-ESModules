import * as path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello from Express with EJS in ESM!' });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});

// 実行コマンド
/*
npx tsc
node dist/server.js
curl http://localhost:3000/
*/

// 注意点
/*
dist/views に index.ejs を保存する
*/