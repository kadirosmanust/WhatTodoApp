import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { serialize } from 'cookie';

import { createToken } from '@/utils/userAuthToken';

type Data = {
  name: string;
};
type LoginData = {
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

  const { username, password }: LoginData = req.body;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
  const db = client.db(process.env.MONGO_DB_DATABASENAME);
  const collection = db.collection('Users');

  const user = await collection.findOne({
    username: username,
  });

  if (!user) {
    res
      .status(200)
      .json({
        username: null,
        password: false,
        verified: user.verified,
      } as any);
    return;
    //TODO: Throw error
  }

  const isUser = user.password === password;

  if (!isUser) {
    res
      .status(200)
      .json({
        username: user.username,
        password: isUser,
        verified: user.verified,
      } as any);
    return;
  }



  const token = await createToken(user.username);
  const serializer = serialize('token', token, {
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader('Set-Cookie', serializer);
  res.status(200).json({ message: 'Success!' } as any);
}
