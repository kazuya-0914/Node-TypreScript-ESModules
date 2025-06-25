import * as fs from 'fs';

const writeFile = (i: number) => {
  if (i >= 10) {
    return;
  }

  const text = `write: ${i}`;
  fs.writeFile('./data.txt', text, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      return console.error(err);
    }
    console.log(text);
    writeFile(i + 1);
  });
};
writeFile(0);