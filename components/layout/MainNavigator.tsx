import React from 'react';
import Link from 'next/link';
import { LogoutIcon, UserIcon } from '@heroicons/react/solid';
import styles from './MainNavigator.module.css';

const MainNavigator = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.profile}>
          <UserIcon className={styles.icon} />
          Profile
        </div>
        <div className={styles.logout}>
          <LogoutIcon className={styles.icon} />
          Logout
        </div>
      </nav>
      <div className={styles.logo}>WhatTodo</div>
    </header>
  );
};

export default MainNavigator;
