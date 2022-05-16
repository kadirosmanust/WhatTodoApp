import type { NextApiRequest, NextApiResponse } from 'next';

import { checkToken } from '@/utils/userAuthToken';
import { MongoClient } from 'mongodb';

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

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
  const db = client.db(process.env.MONGO_DB_DATABASENAME);

  const tokenCollection = db.collection('Tokens');

  const user = await tokenCollection.findOne({
    username: username,
  });
  if (!user) {
    res
      .status(200)
      .json({ isLogged: false, username: null, token: false } as any);
    return;
  }
  const isUserTokenInDb = user.tokens.find((x: any) => x.token === token);

  if (isUser && isUserTokenInDb) {
    res.status(200).json({ isLogged: isUser, username, token: true } as any);
    return;
  }

  res.status(200).json({ isLogged: false, username, token: true } as any);
}
