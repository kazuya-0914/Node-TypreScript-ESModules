import * as fs from 'fs';

export function ReadMarkdownFileSync(path) {
  const markdownStr = fs.readFileSync(
    path, {
      encoding: 'utf8'
    }
  );
  return markdownStr
}