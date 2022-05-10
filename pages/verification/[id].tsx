import axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { login } from '../../src/store/reducers/Auth/authSlice';
import store from '../../src/store/store';

import styles from './Verification.module.css';

const Verification = () => {
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = useState('');
  useEffect(() => {
    const verifAcc = async () => {
      const response: any = await axios.get(`/api/Auth/userVerification/${id}`);
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
  }, []);

  const clickHandler = () => {
    Router.push('/home');
  };

  return (
    <>
      {message && (
        <div className='center'>
          <p className={styles.paragraph}>{message}</p>

          <a className={styles.btn} onClick={clickHandler}>
            Start
          </a>
        </div>
      )}
    </>
  );
};

export default Verification;
