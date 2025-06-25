import { readFile, writeFile, chmod } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const backupFile = `${__filename}-${Date.now()}`;

readFile(__filename, (err: NodeJS.ErrnoException | null, data: Buffer) => {
  if (err) {
    return console.error(err);
  }
  writeFile(backupFile, data, (err) => {
    if (err) {
      return console.error(err);
    }
    chmod(backupFile, 0o400, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Done');
    });
  });
});