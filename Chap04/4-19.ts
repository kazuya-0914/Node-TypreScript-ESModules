import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const sleep = (ms: number) => new Promise(resole => setTimeout(resole, ms));
const realStream = fs.createReadStream(__filename, {
  encoding: 'utf8',
  highWaterMark: 64
});
const writeFileName = `${__filename}-${Date.now()}`;

const write = async (chunk: string | Buffer) => {
  const text = typeof chunk === 'string' ? chunk : chunk.toString();
  await sleep(Math.random() * 1000);
  await writeFile(writeFileName, text, { flag: 'a' })
}

let counter = 0;
realStream.on('data', async (chunk: string | Buffer) => {
  const text = typeof chunk === 'string' ? chunk : chunk.toString();
  console.log(counter, text);
  counter++;
  await write(chunk);
});

realStream.on('close', () => {
  console.log('close');
});

realStream.on('error', (e: Error) => {
  console.log('error:', e);
});