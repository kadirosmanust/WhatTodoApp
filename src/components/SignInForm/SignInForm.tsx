import React, { useRef, useState } from 'react';
import styles from './SignInForm.module.css';
import Router from 'next/router';
import { httpPost } from '../../utils/helpers/httpHelper';

type Props = {};

const SignInForm = (props: Props) => {
  const [buttonText, setButtonText] = useState('Login');
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const submitHandler = async (event: React.FormEvent) => {
    setButtonText('Wait ...');
    event.preventDefault();
    if (
      username.current?.value.trim() === '' ||
      password.current?.value.trim() === ''
    ) {
      return;
    }
    const user = {
      username: username.current?.value,
      password: password.current?.value,
    };
    await httpPost('api/Auth/login', user);
    setButtonText('Logged in.');
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.head}>Sign In</div>
        <form className={styles.form} onSubmit={submitHandler}>
          <label className={styles.label}>Username</label>
          <input
            type='text'
            className={styles.input}
            ref={username}
            placeholder='Username'
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type='password'
            ref={password}
            placeholder='Password'
          />
          <button className={styles.button} type='submit'>
            <div className={styles.svg}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            {buttonText}
          </button>
        </form>
        <div className={styles.pnote}> Powerful note app.</div>
      </div>
    </>
  );
};

export default SignInForm;
