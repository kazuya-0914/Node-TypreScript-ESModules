import { Redis } from 'ioredis';
import express from 'express';
const app = express()

const redis = new Redis({
  port:6379,
  host: 'localhost',
  password: process.env.REDIS_PASSWORD,
});

const init = async () => {
  await Promise.all([
    redis.set('users:1', JSON.stringify({ id: 1, name: 'alpha' })),
    redis.set('users:2', JSON.stringify({ id: 2, name: 'bravo' })),
    redis.set('users:3', JSON.stringify({ id: 3, name: 'charlie' })),
    redis.set('users:4', JSON.stringify({ id: 4, name: 'delta' })),
  ])
}

app.get('/', (req, res) => {
  res.status(200).send('hello world\n');
});

app.get('/user/:id', (req, res) => {
  res.status(200).send(req.params.id);
});

redis.once('ready', async () => {
  try {
    await init();

    app.get('/users', async (req, res) => {
      try {
        const offset = req.query.offset ? Number(req.query.offset) : 0;
        const usersList = await redis.lrange('users:list', offset, offset + 1);
        const users = usersList.map((user) => {
          return JSON.parse(user);
        });
        res.status(200).json({ users });
        
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/user/:id', async (req, res) => {
      try {
        const key = `users:${req.params.id}`;
        const val = await redis.get(key);
        const user = JSON.stringify(val);
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.listen(3000, () => {
      console.log('start listening')
    })
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

redis.on('error', (err: Error) => {
  console.error(err);
  process.exit(1);
});

// 実行コマンド
/*
npx tsc
node dist/server.js
curl http://localhost:3000/users
*/