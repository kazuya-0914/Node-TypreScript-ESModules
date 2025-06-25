import { marked } from 'marked';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { GetPackageName } from './lib/name.js';
import { ReadMarkdownFileSync,  WriteHtmlFileSync } from './lib/file.js';

const{ argv } = yargs(hideBin(process.argv))
  .option('name', {
    describe: 'CLI名を表示'
  })
  .option('file', {
    describe: 'Markdownファイルのパス'
  })
  .option('out', {
    describe: 'html file',
    default: 'article.html'
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (argv.name) {
  const name = GetPackageName();
  console.log(name);
  process.exit(0);
}

const markdownStr = ReadMarkdownFileSync(path.resolve(__dirname, argv.file));
const html = marked(markdownStr);

WriteHtmlFileSync(path.resolve(__dirname, argv.out), html);

// 実行コマンド
/*
npx ts-node src/index.ts --file=../article.md
*/