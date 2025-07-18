import express from 'express';
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('hello world\n');
});

app.get('/user/:id', (req, res) => {
  res.status(200).send(req.params.id);
});

app.listen(3000, () => {
  console.log('start listening');
})

// 実行コマンド
/*
npx ts-node src/index.ts
npx ts-node src/server.ts
*/