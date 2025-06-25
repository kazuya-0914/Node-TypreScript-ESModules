import * as fs from 'fs';

for (let i = 0; i < 10; i++) {
  const text = `write: ${i}`;
  fs.writeFile('./data.txt', text, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      return console.error(err);
    }
    console.log(text);
  })
}