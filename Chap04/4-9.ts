import { readFile, writeFile, chmod } from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const backupFile = `${__filename}-${Date.now()}`;

readFile(__filename)
  .then((data) => {
    return writeFile(backupFile, data);
  })
  .then(() => {
    return chmod(backupFile, 0o400);
  })
  .catch((err) => {
    console.error(err);
  })