/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import DarkThemeToggle from '../../src/components/DarkThemeToggle/DarkThemeToggle';
import SignInUp from '../../src/components/UI/SignInUp';
import { useAppSelector } from '../../src/store/store';
import styles from './index.module.css';

const Welcome = () => {
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogin) {
      Router.push('/welcome');
      return;
    }
  }, [isLogin]);
  return (
    <div className={styles.center}>
      <Head>
        <title>Welcome WhatTodo!</title>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta httpEquiv='Content-Language' content='en' />
      </Head>
      <div className={styles.black}>WhatTodo</div>
      <div className={styles.paragraph}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa
        amet, nam ex ratione deserunt, quia at sapiente vero laborum fugiat
        nobis fugit, quaerat eum pariatur. Enim saepe ducimus similique?
      </div>
      <div className={styles.credit}>
        Made by{' '}
        <a className={styles.link} href='https://github.com/KadoRaw'>
          KadoRaw
        </a>
      </div>
      {!isLogin && <SignInUp />}
      {isLogin && (
        <Link href='/home'>
          <a className={styles.btn}> Let's Start</a>
        </Link>
      )}
      <div className={styles.toggle}>
        <DarkThemeToggle />
      </div>
    </div>
  );
};

export default Welcome;
