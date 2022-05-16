import { logout } from '@/store/reducers/Auth/authSlice';
import store from '@/store/store';
import { httpPost } from '@/utils/helpers/httpHelper';
import Router from 'next/router';
import React, { useState } from 'react';

import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';
import LogOutModal from '../LogOutDarkModal/LogOutModal';
import PasswordChangesModal from '../PasswordChangesModal/PasswordChangesModal';

import styles from './ProfileCard.module.css';

type Props = { username: string };

const ProfileCard = ({ username }: Props) => {
  const [isLogOutModal, setLogOutModal] = useState(false);
  const [isPassModal, setIsPass] = useState(false);

  const goHomeHandler = () => {
    Router.push('/home');
  };
  const logoutHandler = () => {
    setLogOutModal((prevS) => !prevS);
  };
  const logoutAll = async () => {
    const response = (await httpPost('/api/auth/logoutall', username)) as any;

    if (response.data.message.deletedCount > 0) {
      store.dispatch(logout());
      Router.push('/');
      return;
    }
  };

  const passChangeHandler = () => {
    setIsPass((prevS) => !prevS);
  };
  return (
    <div className={styles.card}>
      {isLogOutModal && (
        <LogOutModal logoutAll={logoutAll} logoutHandler={logoutHandler} />
      )}
      {isPassModal && (
        <PasswordChangesModal
          cancelHandler={passChangeHandler}
          changePassword={null}
        />
      )}
      <div className={styles.header}>
        <h1>Hi✋, {username}</h1>
        <div className={styles.btn} onClick={goHomeHandler}>
          Go Home
        </div>
      </div>
      <div className={styles.body}>
        How do you feel today?
        <div className={styles.btn} onClick={passChangeHandler}>
          Change Password
        </div>
        <div className={styles.btn} onClick={logoutHandler}>
          Log Out All Devices
        </div>
      </div>
      <div className={styles.footer}>WhatTodo?</div>
      <div className={styles.toggle}>
        <DarkThemeToggle />
      </div>
    </div>
  );
};

export default ProfileCard;
