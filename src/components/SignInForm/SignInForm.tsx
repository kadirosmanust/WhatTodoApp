import React, { useRef, useState } from 'react';
import styles from './SignInForm.module.css';
import { httpPost } from '../../utils/helpers/httpHelper';
import hash from '../../utils/helpers/hashHelper';
import Router from 'next/router';
import store from '../../store/store';
import { register } from '../../store/reducers/Auth/authSlice';

const SignInForm = () => {
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

    const hashedUserName = username.current?.value; //TODO: Hash this.
    const hashedPassword = hash(password.current?.value);

    const user = {
      username: hashedUserName,
      password: hashedPassword,
    };
    try {
      await httpPost('api/Auth/login', user);
      setButtonText('Logged in.');
      store.dispatch(
        register({ isRegistered: true, username: hashedUserName })
      );
      Router.push('/home');
    } catch (error) {
      setButtonText('Try Again.');
    }
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
