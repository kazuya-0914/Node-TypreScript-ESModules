import { readFile } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
readFile(__filename, (err: NodeJS.ErrnoException | null, data: Buffer) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});