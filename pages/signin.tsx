import React from 'react';
import styles from '../styles/Signin.module.css';

const signin = () => {
  return (
    <div className='center'>
      <div className={styles.main}>
        <div className={styles.head}>Sign In</div>
        <form className={styles.form}>
          <label className={styles.label}>Username</label>
          <input type='text' className={styles.input} placeholder='Username' />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type='password'
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
            Sign In
          </button>
        </form>
        <div className={styles.pnote}> Powerful note app.</div>
      </div>
    </div>
  );
};

export default signin;
