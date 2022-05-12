import React from 'react';
import Link from 'next/link';

import styles from './SignInUp.module.css';

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
