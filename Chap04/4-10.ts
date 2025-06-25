import { readFile, writeFile, chmod } from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const backupFile = `${__filename}-${Date.now()}`;

const main = async () => {
  const data = await readFile(__filename);
  await writeFile(backupFile, data);
  await chmod(backupFile, 0o400);
  return 'Done!';
};
main()
readFile(__filename)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  })