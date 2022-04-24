import React from 'react';
import styles from './SignInUp.module.css';
import Link from 'next/link';

const SignInUp = () => {
  return (
    <div className={styles.center}>
      <Link href='/signin'>
        <a className={styles.signIn}> Sign In </a>
      </Link>

      <Link href='/signup'>
        <a className={styles.signUp}> Sign Up</a>
      </Link>
    </div>
  );
};

export default SignInUp;
