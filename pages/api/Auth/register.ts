import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { createToken } from '../../../src/utils/userAuthToken';
import { serialize } from 'cookie';
import hash from '../../../src/utils/helpers/hashHelper';

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

    const client = await MongoClient.connect(
      `mongodb+srv://kadoraw:bxKfHk84RnWfP3t@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    const db = client.db('whattodo');
    const collection = db.collection('Users');

    const result = (await collection.insertOne({
      username: username,
      email: email,
      password: password,
    })) as any;

    const token = await createToken(username);
    const serializer = serialize('token', token, {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    res.setHeader('Set-Cookie', serializer);

    res.status(200).json({ message: 'Success!' } as any);
  } catch (error) {
    res.status(503).json({ message: error } as any);
  }
}
