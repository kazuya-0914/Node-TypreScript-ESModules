import * as path from 'path';
import { fileURLToPath } from 'url';
import { Redis } from 'ioredis';
import express from 'express';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redis = new Redis({
  port:6379,
  host: 'localhost',
  password: process.env.REDIS_PASSWORD,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello from Express with EJS in ESM!' });
});

app.get('/users', async (req, res) => {
  try {
    const stream = redis.scanStream({
      match: 'users:[1-9]*',
      count: 2
    });
    const users = [];
    for await (const resultKeys of stream) {
      for (const key of resultKeys) {
        const value = await redis.get(key);
        if (value) {
          const user = JSON.parse(value);
          users.push(user);
        }
      }
    }
    res.render(path.join(__dirname, 'views', 'user.ejs'), { users: users})
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
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
dist/views に user.ejs を保存する
*/