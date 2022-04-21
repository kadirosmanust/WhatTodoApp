import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';

type Props = {};

const signup = (props: Props) => {
  return (
    <div className='center'>
      <SignUpForm />
    </div>
  );
};

export default signup;
