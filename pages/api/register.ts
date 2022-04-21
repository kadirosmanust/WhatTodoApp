import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import cyrpto from 'bcrypt';

type Data = {
  name: string;
};
type User = {
  username: string;
  email: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      return;
    }

    const { username, email, password }: User = req.body;

    const [client, hashedPass] = await Promise.all([
      MongoClient.connect(
        `mongodb+srv://kadoraw:bxKfHk84RnWfP3t@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      ),
      await cyrpto.hash(password, 12),
    ]);
    const db = client.db('whattodo');
    const collection = db.collection('Users');

    const result = (await collection.insertOne({
      username: username,
      email: email,
      password: hashedPass,
    })) as any;
    res.status(200).json(result);
  } catch (error) {
    res.status(503).json({ message: error } as any);
  }
}
