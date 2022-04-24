import React, { useEffect } from 'react';
import SignInForm from '../src/components/SignInForm/SignInForm';
import { httpGet } from '../src/utils/helpers/httpHelper';

const Signin = () => {
  useEffect(() => {
    try {
      httpGet('api/Auth/checkuser');
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className='center'>
      <SignInForm />
    </div>
  );
};

export default Signin;
