import jwt from 'jsonwebtoken';

const SECRET_KEY = 'whattodotokentry';

export const createToken = (username: string) => {
  const maxAge = 60 * 60 * 24 * 7;
  const token = jwt.sign({ username }, SECRET_KEY, {
    expiresIn: maxAge,
  });
  return token;
};

export const checkToken = (token: string) => {
  const isValid = jwt.verify(token, SECRET_KEY);

  return isValid;
};
