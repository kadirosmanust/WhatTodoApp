import type { NextApiRequest, NextApiResponse } from 'next';
import { checkToken } from '../../../src/utils/userAuthToken';
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
  const cookie = req.headers.authorization;
  const token = cookie ? cookie.split(' ')[1] : '';

  const isUser = await checkToken(token);
  if (isUser) {
    res.status(200).json({ isLogged: isUser } as any);
  }

  res.status(200).json({ isLogged: isUser } as any);
}
