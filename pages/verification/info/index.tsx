import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/store';

import styles from '../Verification.module.css';

const Verification = () => {
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin) {
      Router.push('/home');
      return;
    }
  }, [isLogin]);

  return (
    <>
      {!isLogin && (
        <div className='center'>
          <p className={styles.paragraph}>
            Please, Check your email adress. And verify your e-mail. Note: Check
            Spam Folder either.
          </p>
          <Link href={'/home'}>
            <a className={styles.btn}>Home</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default Verification;
