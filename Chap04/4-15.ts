import { createServer } from 'http';
import type { IncomingMessage, ServerResponse } from 'http';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.write('hello world\n');
  res.end();
})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});