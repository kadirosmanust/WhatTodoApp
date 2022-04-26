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

  if (isUser) {
    const client = await MongoClient.connect(
      `mongodb+srv://kadoraw:bxKfHk84RnWfP3t@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    const db = client.db('whattodo');
    const collection = db.collection('Users');
    const user = (await collection.findOne({ username: username })) as any;
    const notes = user.notes;
    let newNotes;
    if (!notes) {
      newNotes = [req.body];
    } else {
      newNotes = [...notes, req.body];
    }
    await collection.updateOne(
      { username: username },
      { $set: { notes: newNotes } }
    );

    res.status(200).json({ message: 'Success!' } as any);
  }
  res.status(401);
}
