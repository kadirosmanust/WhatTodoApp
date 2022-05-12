import type { NextApiRequest, NextApiResponse } from 'next';

import { checkToken } from '@/utils/userAuthToken';

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
    res.status(200).json({ isLogged: isUser, username } as any);
    return;
  }

  res.status(200).json({ isLogged: isUser, username } as any);
}