import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from '../src/styles/Home.module.css';

const Home = () => {
  useEffect(() => {
    Router.push('/home');
  }, []);
  return <div className={styles.container}>Deneme</div>;
};

export default Home;
