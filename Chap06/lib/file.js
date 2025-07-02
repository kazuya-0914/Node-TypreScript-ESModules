import * as fs from 'fs';

export function ReadMarkdownFileSync(path) {
  const markdownStr = fs.readFileSync(
    path, {
      encoding: 'utf8'
    }
  );
  return markdownStr
}

// 5-12
export function WriteHtmlFileSync(path, html) {
  fs.writeFileSync(
    path, html, {
      encoding: 'utf8'
    }
  )
}