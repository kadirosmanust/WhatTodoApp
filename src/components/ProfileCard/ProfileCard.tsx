import Router from 'next/router';
import React from 'react';

import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';

import styles from './ProfileCard.module.css';

type Props = { username: string };

const ProfileCard = ({ username }: Props) => {
  const goHomeHandler = () => {
    Router.push('/home');
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1>Hi✋, {username}</h1>
        <div className={styles.btn} onClick={goHomeHandler}>
          Go Home
        </div>
      </div>
      <div className={styles.body}>How do you feel today?</div>
      <div className={styles.footer}>WhatTodo?</div>
      <div className={styles.toggle}>
        <DarkThemeToggle />
      </div>
    </div>
  );
};

export default ProfileCard;
