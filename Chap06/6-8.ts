import express from 'express';
import type { Request, Response, NextFunction } from 'express';
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('hello world\n');
});

app.get('/user/:id', (req, res) => {
  res.status(200).send(req.params.id);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('start listening');
})

// 実行コマンド
/*
npx tsc
node dist/server.js
*/