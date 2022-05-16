import React from 'react';
import Router from 'next/router';
import { LogoutIcon, UserIcon } from '@heroicons/react/solid';

import { logout } from '@/store/reducers/Auth/authSlice';
import store, { useAppSelector } from '@/store/store';
import { httpPost } from '@/utils/helpers/httpHelper';
import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';

import styles from './MainNavigator.module.css';

const MainNavigator = () => {
  const { isLogin, username } = useAppSelector((state) => state.auth);

  const logOutClickHandler = async () => {
    await httpPost('/api/auth/logout', username);

    store.dispatch(logout());
    Router.push('/');
  };
  const profileClickHandler = () => {
    Router.push('/profile');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.toggle}>
          <DarkThemeToggle />
        </div>
        <div className={styles.profile} onClick={profileClickHandler}>
          <UserIcon className={styles.icon} />
          <p>Profile</p>
        </div>
        <div className={styles.logout} onClick={logOutClickHandler}>
          <LogoutIcon className={styles.icon} />
          <p>Logout</p>
        </div>
      </nav>
      <div
        className={styles.logo}
        onClick={() => {
          Router.push('/home');
        }}
      >
        WhatTodo
      </div>
    </header>
  );
};

export default MainNavigator;
