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

  const { isValid: isUser } = await checkToken(token);

  if (isUser) {
    res.status(401).json({ isLogged: isUser } as any);
    return;
  }

  res.status(200).json({ isLogged: isUser } as any);
}
