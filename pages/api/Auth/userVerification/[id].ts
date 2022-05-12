import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { serialize } from 'cookie';

import { createToken } from '@/utils/userAuthToken';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
  const db = client.db(process.env.MONGO_DB_DATABASENAME);
  const userCollection = db.collection('Users');
  const authCollection = db.collection('Auths');

  const user = await authCollection.findOne({
    token: id,
  });

  if (!user) {
    res.status(200).json({ message: 'Invalid adress.' } as any);
    return;
  }

  const username = user.username;

  userCollection.updateOne(
    { username: username },
    { $set: { verified: true } }
  );

  authCollection.deleteOne({ token: id });

  const token = await createToken(username);
  const serializer = serialize('token', token, {
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader('Set-Cookie', serializer);
  res
    .status(200)
    .json({ message: 'User is verified.', username: username } as any);
}
