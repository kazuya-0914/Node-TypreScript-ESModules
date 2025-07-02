import express from 'express';
import type { Request, Response, NextFunction } from 'express';
const app = express()

const errorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('errルート');
}

app.get('/err', errorMiddleware, (req, res) => {
  res.status(200).send('errルート');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('start listening');
});

// 実行コマンド
/*
npx tsc
node dist/server.js
*/