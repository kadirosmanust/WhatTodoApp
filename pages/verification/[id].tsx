import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { login } from '@/store/reducers/Auth/authSlice';
import store from '@/store/store';

import styles from './Verification.module.css';

const Verification = () => {
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = useState('');
  useEffect(() => {
    const verifAcc = async () => {
      const response: any = await axios.get(`/api/auth/userVerification/${id}`);
      const responseMessage = response.data.message;

      if (responseMessage === 'Invalid adress.') {
        setMessage('Invalid link. Sorry about this.');
      } else {
        setMessage(responseMessage);
        store.dispatch(
          login({ isLogin: true, username: response.data.username })
        );
      }
    };
    verifAcc();
  }, [id]);

  return (
    <>
      {message && (
        <div className='center'>
          <p className={styles.paragraph}>{message}</p>
          <Link href={'/home'}>
            <a className={styles.btn}>Start</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default Verification;
