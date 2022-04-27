import React from 'react';
import Router from 'next/router';
import { LogoutIcon, UserIcon } from '@heroicons/react/solid';
import styles from './MainNavigator.module.css';
import { logout } from '../../store/reducers/Auth/authSlice';
import store from '../../store/store';
import { httpGet } from '../../utils/helpers/httpHelper';

const MainNavigator = () => {
  const logOutClickHandler = () => {
    httpGet('/api/Auth/logout');

    store.dispatch(logout());
    Router.push('/');
  };
  const profileClickHandler = () => {
    Router.push('/profile');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.profile} onClick={profileClickHandler}>
          <UserIcon className={styles.icon} />
          <p>Profile</p>
        </div>
        <div className={styles.logout} onClick={logOutClickHandler}>
          <LogoutIcon className={styles.icon} />
          <p>Logout</p>
        </div>
      </nav>
      <div className={styles.logo}>WhatTodo</div>
    </header>
  );
};

export default MainNavigator;
