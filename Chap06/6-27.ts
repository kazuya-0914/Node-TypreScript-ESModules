import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

const cookieMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authToken = (req as any).cookies?.authToken;

  if (!authToken) {
    // トークンがない場合は認証エラー
    console.warn('認証トークンがありません。');
    res.status(401).json({ message: '認証が必要です。' });
    return;
  }
  // ここで authToken の有効性を検証するロジックを記述
  if (authToken === 'valid-secret-token') { // 仮の検証ロジック
    console.log('認証トークンが有効です。');
    // 検証が成功したら、次のミドルウェアまたはルートハンドラへ
    next();
  } else {
    // トークンが無効な場合は認証エラー
    console.warn('無効な認証トークンです。');
    res.status(403).json({ message: '認証トークンが無効です。' });
    return;
  }
}

router.get('/foo', cookieMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ foo: 'foo', message: '認証済みアクセス' });
});

router.get('/bar', (req: Request, res: Response) => {
  res.status(200).json({ bar: 'bar', message: '認証不要アクセス' });
});

export default router;

// 複数ファイルコンパイル
/*
npx tsc src/server.ts src/api.ts --outDir dist
*/