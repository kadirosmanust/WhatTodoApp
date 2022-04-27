import Router from 'next/router';
import React, { useEffect } from 'react';
import ProfileCard from '../../src/components/ProfileCard/ProfileCard';
import { useAppSelector } from '../../src/store/store';

const UserProfile = () => {
  const { isRegistered, username } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isRegistered) {
      Router.push('/home');
      return;
    }
  }, [isRegistered]);

  return (
    <div className='center'>
      <ProfileCard username={username} />
    </div>
  );
};

export default UserProfile;
