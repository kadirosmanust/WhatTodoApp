import Router from 'next/router';
import React, { useEffect } from 'react';
import SignUpForm from '../src/components/SignUpForm/SignUpForm';
import { useAppSelector } from '../src/store/store';

type Props = {};

const SignUp = (props: Props) => {
  const { isRegistered } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isRegistered) {
      Router.push('/welcome');
      return;
    }
  }, [isRegistered]);

  const goHome = () => {
    Router.push('/welcome');
  };
  const goLogin = () => {
    Router.push('/signin');
  };

  return (
    <div className='center'>
      {!isRegistered && <SignUpForm />}
      {!isRegistered && (
        <div className='nav'>
          <div className='gohome' onClick={goHome}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <p>Go Home</p>
          </div>

          <div className='primarybtn' onClick={goLogin}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
            <p>Login</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
