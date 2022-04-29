import React, { useRef, useState } from 'react';
import styles from './SignUpForm.module.css';
import { httpPost } from '../../utils/helpers/httpHelper';
import hash from '../../utils/helpers/hashHelper';
import Router from 'next/router';
import store from '../../store/store';
import { login } from '../../store/reducers/Auth/authSlice';
import { useForm } from 'react-hook-form';

type User = {
  username: string;
  email: string;
  password: string;
  passagain: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<User>({ mode: 'onTouched' });
  const password = useRef({});
  password.current = watch('password', '');

  const [buttonText, setButtonText] = useState('Register');

  const denem = handleSubmit(async ({ username, email, password }) => {
    setButtonText('Wait...');
    const hashedpass = hash(password);
    const newUser = {
      username,
      email,
      password: hashedpass,
    };
    try {
      await httpPost('/api/Auth/register', newUser);
      store.dispatch(login({ isLogin: true, username: newUser.username }));
      setButtonText('Success!');
      Router.push('/home');
    } catch (error) {
      setButtonText('Try Again!');
    }
  });

  const registerOption = {
    username: {
      required: 'Username is required.',
      minLength: {
        value: 4,
        message: 'Have to be bigger than 4',
      },
    },
    password: {
      required: 'Password is required.',
      minLength: {
        value: 6,
        message: 'Have to be bigger than 6',
      },
    },
    passwordAgain: {
      required: 'Password is required.',
      validate: {
        isMatch: (value: string) =>
          value === password.current || 'The passwords do not match',
      },
    },
    email: {
      required: 'Email is required.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'invalid email address',
      },
    },
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.head}>Sign Up</div>
        <form className={styles.form} onSubmit={denem}>
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            {...register('username', registerOption.username)}
            className={styles.input}
            placeholder='Username'
          />
          {errors.username && (
            <label className={styles.error}>{errors.username.message}</label>
          )}
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
          <input
            id='email'
            type='text'
            {...register('email', registerOption.email)}
            className={styles.input}
            placeholder='Email'
          />
          {errors.email && (
            <label className={styles.error}>{errors.email.message}</label>
          )}
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input
            id='password'
            className={styles.input}
            {...register('password', registerOption.password)}
            type='password'
            placeholder='Password'
          />
          {errors.password && (
            <label className={styles.error}>{errors.password.message}</label>
          )}
          <label htmlFor='passagain' className={styles.label}>
            Password Again
          </label>
          <input
            id='passagain'
            {...register('passagain', registerOption.passwordAgain)}
            className={styles.input}
            type='password'
            placeholder='Password Again'
          />
          {errors.passagain && (
            <label className={styles.error}>{errors.passagain.message}</label>
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
    </>
  );
};

export default SignUpForm;
