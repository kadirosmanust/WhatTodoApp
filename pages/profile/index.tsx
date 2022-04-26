import axios from 'axios';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../src/store/store';

type Props = {};

const UserProfile = (props: Props) => {
  const { isRegistered, username } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isRegistered) {
      Router.push('/home');
      return;
    }
  }, [isRegistered]);

  return <div>{username}</div>;
};

export default UserProfile;
