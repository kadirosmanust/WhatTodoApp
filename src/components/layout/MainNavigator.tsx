import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { LogoutIcon, UserIcon } from '@heroicons/react/solid';
import styles from './MainNavigator.module.css';

const MainNavigator = () => {
  const logOutClickHandler = () => {
    fetch('/api/Auth/logout');
    Router.push('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.profile}>
          <UserIcon className={styles.icon} />
          Profile
        </div>
        <div className={styles.logout} onClick={logOutClickHandler}>
          <LogoutIcon className={styles.icon} />
          Logout
        </div>
      </nav>
      <div className={styles.logo}>WhatTodo</div>
    </header>
  );
};

export default MainNavigator;
