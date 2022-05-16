import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { v4 } from 'uuid';

import type { User, Note } from '../../../src/types/types';
import mailHelper from '../../../src/utils/helpers/mailHelper';

type Data = {
  name: string;
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
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    const db = client.db(process.env.MONGO_DB_DATABASENAME);

    const userCollection = db.collection('Users');
    const authCollection = db.collection('Auths');

    const user = await userCollection.findOne({
      username: username,
    });

    if (user) {
      res.status(200).json({ username: username } as any);
      return;
    }

    const authuuID = v4();
    authCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 86400000 }
    );
    authCollection.insertOne({
      createdAt: new Date(),
      token: authuuID,
      username: username,
    });

    const notes: Note[] = [
      { title: `Hello ${username}`, note: 'Have fun.', id: v4(), url: '' },
    ];

    const result = (await userCollection.insertOne({
      username: username,
      email: email,
      verified: false,
      passwordReset: false,
      password: password,
      notes: notes,
    })) as any;

    await mailHelper.sendMail({
      to: email,
      subject: 'Please confirm your Email account',
      html: `
      Hello ${username}
      You registered an account on WhatTodo App, before being able to use your account you need to verify that this is your email address by clicking here:<a href='https://what-todo-app.vercel.app/verification/${authuuID}'>Click Here</a>
      
      Kind Regards, WhatTodo App: 
      
      `,
    });

    res.status(200).json({ message: 'Success!' } as any);
  } catch (error) {
    res.status(503).json({ message: error } as any);
  }
}
