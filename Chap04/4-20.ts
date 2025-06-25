import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const sleep = (ms: number) => new Promise(resole => setTimeout(resole, ms));
const writeFileName = `${__filename}-${Date.now()}`;

const write = async (chunk: string | Buffer) => {
  const text = typeof chunk === 'string' ? chunk : chunk.toString();
  await sleep(Math.random() * 1000);
  await writeFile(writeFileName, text, { flag: 'a' })
}

const main = async () => {
  const stream = fs.createReadStream(__filename, {
    encoding: 'utf8',
    highWaterMark: 64
  });
  let counter = 0;

  for await (const chunk of stream) {
    console.log(counter);
    counter++;
    await write(chunk);
  }
}

main().catch((e) => console.error(e));