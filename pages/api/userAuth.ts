import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import cyrpto from 'bcrypt';

type Data = {
  name: string;
};
type User = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return;
  }

  const { username, password }: User = req.body;

  const [client, hashedPass] = await Promise.all([
    MongoClient.connect(
      `mongodb+srv://kadoraw:bxKfHk84RnWfP3t@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    ),
    await cyrpto.hash(password, 12),
  ]);
  const db = client.db('whattodo');
  const collection = db.collection('Users');

  const user = await collection.findOne({
    username: username,
  });

  if (!user) {
    res.status(200).json({ username: null, password: false } as any);
    return;
  }
  const isUser = await cyrpto.compare(password, user?.password);
  res.status(200).json({ username: user, password: isUser } as any);
}
