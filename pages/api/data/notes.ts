import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { checkToken } from '@/utils/userAuthToken';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookie = req.headers.authorization;
  const token = cookie ? cookie.split(' ')[1] : '';

  const { isValid: isUser, username } = await checkToken(token);
  try {
    if (isUser) {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      );
      const db = client.db(process.env.MONGO_DB_DATABASENAME);
      const collection = db.collection('Users');

      const user = await collection.findOne({
        username: username,
      });

      res.status(200).json({
        username,
        notes: user.notes,
      } as any);
      return;
    }
    res.status(401);
  } catch (error) {
    res.status(304).json({ error } as any);
  }
}
