import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
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
    res.status(200).json({
      username,
      notes: [
        { id: 'lel', title: 'deneme', note: 'ahandaiçerik' },
        { id: 'aaa', title: 'deneme2', note: 'ahandaiçerik' },
      ],
    } as any);
  }
  res.status(401);
}
