import React, { useState, useEffect } from 'react';
import SignUpForm from '../src/components/SignUpForm/SignUpForm';
import { httpGet } from '../src/utils/helpers/httpHelper';

type Props = {};

const SignUp = (props: Props) => {
  
  return (
    <div className='center'>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
