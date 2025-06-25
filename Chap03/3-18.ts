import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename, __dirname をESMで再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

readFile(__filename, (err: NodeJS.ErrnoException | null, data: Buffer) => {
  if (err) {
    console.error('読み込みエラー:', err.message);
    return;
  }

  console.log('ファイル内容（Buffer）:', data.toString());
});