import * as path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { connect, init, getClient } from './redis.js';
import { getUser, getUsers } from './user.js';
import type { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 特定のユーザーを取得するルート
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user  = await getUser(req);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.render('users', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('internal error');
  }
});

// 全ユーザーを取得するルート
app.get('/users', async (req: Request, res: Response) => {
  try {
    const { users } = await getUsers();
    res.render('users', { users }); // EJS 側で users をループ描画
  } catch (err) {
    console.error(err);
    res.status(500).send('internal error');
  }
});

connect();
const redis = getClient();

if (!redis) {
  throw new Error('Redis failed to connect');
}

redis.once('ready', async () => {
  try {
    await init();
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000');
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).on('error', (err: Error) => {
  console.error(err);
  process.exit(1);
});