import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { GetPackageName } from './lib/name.js';
import { ReadMarkdownFileSync } from './lib/file.js';

const{ argv } = yargs(hideBin(process.argv))
  .option('name', {
    describe: 'CLI名を表示'
  })
  .option('file', {
    describe: 'Markdownファイルのパス'
  })
  ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (argv.name) {
  const name = GetPackageName();
  console.log(name);
  process.exit(0);
}

const markdownStr = ReadMarkdownFileSync(path.resolve(__dirname, argv.file));
console.log(markdownStr);

// 実行コマンド
/*
npx ts-node src/index.ts --file=../article.md
*/