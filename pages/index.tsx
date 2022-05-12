import Router from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from '@/store/store';

const Home = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isLogin) {
      Router.push('/home');
      return;
    }
    Router.push('/welcome');
  }, [isLogin]);

  return;
};

export default Home;
