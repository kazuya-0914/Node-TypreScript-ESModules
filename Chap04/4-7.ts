import * as fs from 'fs';
import { readFile, writeFile, chmod } from 'fs';
import { fileURLToPath } from 'url';

const readFileAsync = (path: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    readFile(path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

const writeFileAsync = (path: string, data: string | NodeJS.ArrayBufferView) => {
  return new Promise<void>((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

const chmodAsync = (path: string, mode: fs.Mode) => {
  return new Promise<void>((resolve, reject) => {
    chmod(backupFile, mode, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

const __filename = fileURLToPath(import.meta.url);
const backupFile = `${__filename}-${Date.now()}`;

readFileAsync(__filename)
  .then((data) => {
    return writeFileAsync(backupFile, data);
  })
  .then(() => {
    return chmodAsync(backupFile, 0o400);
  })
  .catch((err) => {
    console.error(err);
  });