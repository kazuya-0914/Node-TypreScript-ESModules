import { Redis } from 'ioredis';
import express from 'express';
const app = express()

const redis = new Redis({
  port:6379,
  host: 'localhost',
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false
});

app.get('/', (req, res) => {
  res.status(200).send('hello world\n');
});

app.get('/user/:id', (req, res) => {
  res.status(200).send(req.params.id);
});

redis.once('ready', () => {
  try {
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

// tsconfig.json
/*
{
  "compilerOptions": {
    "target": "es2024",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },*/
 // "include": ["./src/**/*.ts"]
// }

// 実行コマンド
/*
npx tsc
node dist/server.js
*/