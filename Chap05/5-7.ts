import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

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

const packageStr = fs.readFileSync(
  path.resolve(__dirname, '../package.json'),
  {
    encoding: 'utf8'
  });
const pkg = JSON.parse(packageStr);
const nameOption = process.argv.includes('--name');

if (argv.name) {
  console.log(pkg.name);
} else {
  console.log('オプションがありません');
}

// 実行コマンド
/*
npx ts-node src/index.ts --help
*/