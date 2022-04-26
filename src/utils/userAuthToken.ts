/* eslint-disable @next/next/no-server-import-in-page */
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = async (username: string) => {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7w')
    .sign(new TextEncoder().encode(SECRET_KEY));

  return token;
};

export const checkToken = async (token: string) => {
  if (!token) {
    return { isValid: false, username: '' };
  }

  const jwtResponse = await jwtVerify(
    token,
    new TextEncoder().encode(SECRET_KEY),
    {
      maxTokenAge: '7w',
    }
  );
  const isValid = jwtResponse ? true : false;
  console.log(isValid);

  return { isValid, username: jwtResponse.payload.username };
};
