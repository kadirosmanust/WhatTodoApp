import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from '../src/styles/Home.module.css';
import { httpGet } from '../src/utils/helpers/httpHelper';

const Home = () => {
  useEffect(() => {
    (async () => {
      const body = (await httpGet('/api/Auth/checkuserindex')) as any;
      const response = body.data.isLogged;

      if (response) {
        Router.push('/home');
        return;
      }
      Router.push('/welcome');
    })();
  }, []);
  return;
};

export default Home;
