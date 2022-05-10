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
        `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      );
      const db = client.db(process.env.MONGO_DB_DATABASENAME);
      const collection = db.collection('Users');
      const user = (await collection.findOne({ username: username })) as any;
      const notes = [...user.notes];
      if (!notes) {
        res.status(401);
        return;
      }
      const note = req.body;
      const updatedNotes = notes.filter((notes) => notes.id !== note.id);

      await collection.updateOne(
        { username: username },
        { $set: { notes: updatedNotes } }
      );

      res.status(200).json({ message: 'Success!' } as any);
      return;
    }
    res.status(401);
  } catch (error) {
    res.status(304).json({ error } as any);
  }
}
