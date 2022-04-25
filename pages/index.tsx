import Router from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../src/store/store';

const Home = () => {
  const { isRegistered } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isRegistered) {
      Router.push('/home');
      return;
    }
    Router.push('/welcome');
  }, [isRegistered]);

  return;
};

export default Home;
