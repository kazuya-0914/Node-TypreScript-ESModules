import { readFile } from 'fs';
import { fileURLToPath } from 'url';

console.log('A');

const __filename = fileURLToPath(import.meta.url);
readFile(__filename, (err: NodeJS.ErrnoException | null, data: Buffer) => {
  if (err) {
    console.error('読み込みエラー:', err.message);
    return;
  }

  console.log('B', data.toString());
});

console.log('C');