import React, { useRef } from 'react';
import styles from './SignUpForm.module.css';

type Props = {};

const SignUpForm = (props: Props) => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordagain = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const todo = {
      username: username.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      passwordagain: passwordagain.current?.value,
    };
    console.log(todo);
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.head}>Sign Up</div>
        <form className={styles.form} onSubmit={submitHandler}>
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            ref={username}
            className={styles.input}
            placeholder='Username'
          />
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
          <input
            id='email'
            type='text'
            ref={email}
            className={styles.input}
            placeholder='Email'
          />
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input
            id='password'
            className={styles.input}
            ref={password}
            type='password'
            placeholder='Password'
          />
          <label htmlFor='passagain' className={styles.label}>
            Password Again
          </label>
          <input
            id='passagain'
            className={styles.input}
            ref={passwordagain}
            type='password'
            placeholder='Password Again'
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
            Sign Up
          </button>
        </form>
        <div className={styles.pnote}> Powerful note app.</div>
      </div>
    </>
  );
};

export default SignUpForm;
