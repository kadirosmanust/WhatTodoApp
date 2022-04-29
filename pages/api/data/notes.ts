import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkToken } from '../../../src/utils/userAuthToken';
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
        `mongodb+srv://kadoraw:bxKfHk84RnWfP3t@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      );
      const db = client.db('whattodo');
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
