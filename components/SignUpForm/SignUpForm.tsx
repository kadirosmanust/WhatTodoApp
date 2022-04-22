import React, { useRef, useState } from 'react';
import styles from './SignUpForm.module.css';

type Props = {};
type User = { username: string; email: string; password: string };

const SignUpForm = (props: Props) => {
  const [usernameValidate, setUsernameValid] = useState(`${styles.input}`);
  const [emailValidate, setEmailValid] = useState(`${styles.input}`);
  const [passwordValidate, setPassValid] = useState(`${styles.input}`);
  const [passwordAgainValidate, setPassAgainValid] = useState(
    `${styles.input}`
  );
  const [buttonText, setButtonText] = useState('Register');

  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordagain = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    setButtonText('Wait...');
    event.preventDefault();
    let flag = false;

    if (
      username.current?.value.trim() === '' ||
      email.current?.value.trim() === '' ||
      password.current?.value.trim() === '' ||
      passwordagain?.current?.value.trim() === ''
    ) {
      usernameBlurHandler();
      emailBlurHandler();
      passwordBlurHandler();
      passAgainBlurHandler();
      setButtonText('Register');
      return;
    }
    if (
      password.current?.value.trim() !== passwordagain?.current?.value.trim()
    ) {
      //TODO: Error handle

      setButtonText('Register');
      return;
    }
    if (!email.current?.value.trim().includes('@')) {
      //TODO: Error handle

      setButtonText('Register');
      return;
    }
    const newUser: User = {
      username: username.current?.value!,
      email: email.current?.value!,
      password: password.current?.value!,
    };

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    setButtonText('Success!');

    console.log(data);
  };

  const usernameBlurHandler = () => {
    const usernameValidclass =
      username.current?.value.trim() !== ''
        ? `${styles.input} ${styles.valid}`
        : `${styles.input} ${styles.reject}`;

    setUsernameValid(usernameValidclass);
  };

  const emailBlurHandler = () => {
    const validclass =
      email.current?.value.trim() !== ''
        ? `${styles.input} ${styles.valid}`
        : `${styles.input} ${styles.reject}`;

    setEmailValid(validclass);
  };

  const passwordBlurHandler = () => {
    const validclass =
      password.current?.value.trim() !== ''
        ? `${styles.input} ${styles.valid}`
        : `${styles.input} ${styles.reject}`;

    setPassValid(validclass);
  };
  const passAgainBlurHandler = () => {
    const validclass =
      passwordagain?.current?.value.trim() !== ''
        ? `${styles.input} ${styles.valid}`
        : `${styles.input} ${styles.reject}`;

    setPassAgainValid(validclass);
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
            onBlur={usernameBlurHandler}
            className={usernameValidate}
            placeholder='Username'
          />
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
          <input
            id='email'
            type='text'
            onBlur={emailBlurHandler}
            ref={email}
            className={emailValidate}
            placeholder='Email'
          />
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input
            id='password'
            className={passwordValidate}
            onBlur={passwordBlurHandler}
            ref={password}
            type='password'
            placeholder='Password'
          />
          <label htmlFor='passagain' className={styles.label}>
            Password Again
          </label>
          <input
            id='passagain'
            className={passwordAgainValidate}
            onBlur={passAgainBlurHandler}
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
            {buttonText}
          </button>
        </form>
        <div className={styles.pnote}> Powerful note app.</div>
      </div>
    </>
  );
};

export default SignUpForm;
