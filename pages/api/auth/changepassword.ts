import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
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

  const newPassword = req.body;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
  const db = client.db(process.env.MONGO_DB_DATABASENAME);
  const collection = db.collection('Users');

  const response = await collection.updateOne(
    { username: username },
    { $set: { password: newPassword } }
  );

  res.status(200).json({ message: response } as any);
}
