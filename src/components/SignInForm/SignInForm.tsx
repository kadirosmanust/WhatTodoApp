import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { httpPost } from '@/utils/helpers/httpHelper';
import hash from '@/utils/helpers/hashHelper';
import store from '@/store/store';
import { login } from '@/store/reducers/Auth/authSlice';
import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';

import styles from './SignInForm.module.css';

type User = {
  username: string;
  password: string;
};
const SignInForm = () => {
  const [buttonText, setButtonText] = useState('Login');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<User>({ mode: 'onTouched' });

  const loginOption = {
    username: { required: 'Username is required.' },
    password: { required: 'Password is required.' },
  };

  const submitHandler = handleSubmit(async ({ username, password }) => {
    setButtonText('Wait...');

    const hashedPassword = hash(password);

    const user = {
      username: username,
      password: hashedPassword,
    };

    try {
      const response = (await httpPost('api/auth/login', user)) as any;
      if (!response.data.username && response.data.message !== 'Success!') {
        setError('username', { type: 'custom', message: 'User not found!' });
        setButtonText('Login.');

        return;
      }
      if (!response.data.password && response.data.message !== 'Success!') {
        setError('password', { type: 'custom', message: 'Password is wrong!' });
        setButtonText('Login.');

        return;
      }
      if (!response.data.verified) {
        setError('username', {
          type: 'custom',
          message: 'Check your e-mail box',
        });
        setButtonText('Login.');

        return;
      }
      setButtonText('Logged in.');
      store.dispatch(login({ isLogin: true, username: username }));
      Router.push('/home');
    } catch (error) {
      setButtonText('Try Again.');
    }
  });

  return (
    <>
      <div className={styles.main}>
        <div className={styles.head}>Sign In</div>
        <form className={styles.form} onSubmit={submitHandler}>
          <label className={styles.label} htmlFor='Username'>
            Username
          </label>
          <input
            id='Username'
            type='text'
            className={styles.input}
            {...register('username', loginOption.username)}
            placeholder='Username'
          />
          {errors.username && (
            <label className={styles.error}>{errors.username.message}</label>
          )}
          <label className={styles.label} htmlFor='Password'>
            Password
          </label>
          <input
            id='Password'
            className={styles.input}
            type='password'
            {...register('password', loginOption.password)}
            placeholder='Password'
          />
          {errors.password && (
            <label className={styles.error}>{errors.password.message}</label>
          )}
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
      <div className={styles.toggle}>
        <DarkThemeToggle />
      </div>
    </>
  );
};

export default SignInForm;
