import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const serializer = serialize('token', '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 1,
  });

  res.setHeader('Set-Cookie', serializer);
  res.status(200).json({ message: 'Success!' } as any);
}
