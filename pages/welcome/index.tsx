/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SignInUp from '../../src/components/UI/SignInUp';
import { httpGet } from '../../src/utils/helpers/httpHelper';
import styles from './index.module.css';

const Welcome = () => {
  const [isLogged, setLogged] = useState();

  useEffect(() => {
    (async () => {
      const body = (await httpGet('/api/Auth/checkuserindex')) as any;
      const response = body.data.isLogged;

      setLogged(response);
    })();
  }, []);
  return (
    <div className={styles.center}>
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
      {!isLogged && <SignInUp />}
      {isLogged && (
        <Link href='/home'>
          <a className={styles.btn}> Let's Start</a>
        </Link>
      )}
    </div>
  );
};

export default Welcome;
