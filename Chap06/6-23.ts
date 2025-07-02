import { Router, Request, Response } from 'express';
const router = Router();

router.get('/foo', (req: Request, res: Response) => {
  res.status(200).json({ foo: 'foo' });
});

router.get('/bar', (req: Request, res: Response) => {
  res.status(200).json({ bar: 'bar' });
});

export default router;

// 複数ファイルコンパイル
/*
npx tsc src/server.ts src/api.ts --outDir dist
*/