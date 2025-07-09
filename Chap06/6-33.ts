import type { Request } from 'express';
import { getClient } from './redis.js';

type User = {
  id: number;
  name: string
};

export const getUser = async (req: Request): Promise<User | null> => {
  const key = `users:${req.params.id}`;
  const client = getClient();
  if (!client) throw new Error('Redis not initialized');

  const val = await client.get(key);
  return val ? JSON.parse(val) : null;
}

export const getUsers = async (): Promise<{ users: User[] }> => {
  const client = getClient();
  if (!client) throw new Error('Redis not initialized');

  const stream = client.scanStream({
    match: 'users:[0-9]*',
    count: 2
  });

  const users: User[] = [];

  for await (const resultKeys of stream) {
    for (const key of resultKeys) {
      const val = await client.get(key); 
      if (val) {
        const user: User = JSON.parse(val);
        users.push(user);
      }
    }
  }
  return { users };
};