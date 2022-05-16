/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import DarkThemeToggle from '@/components/DarkThemeToggle/DarkThemeToggle';
import SignInUp from '@/components/UI/SignInUp';
import { useAppSelector } from '@/store/store';

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
        WhatTodoApp is a powerful note taking app. Built for{' '}
        <span className={styles.important}>endless uses.</span> Get started for
        free. Completely free.
        <span className={styles.important}> Completely powerful</span>
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
