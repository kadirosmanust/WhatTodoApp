import React from 'react';

import styles from './LogOutModal.module.css';

type Props = { logoutAll: () => void; logoutHandler: () => void };

const LogOutModal = ({ logoutAll, logoutHandler }: Props) => {
  return (
    <div className={styles.darkmodal}>
      <div className={styles.modal}>
        {' '}
        <h1>Sign Out of All Devices</h1>
        <p>
          Are you sure you want to sign out of this WhatTodoApp account on all
          devices?
        </p>
        <div className={styles.buttons}>
          <div className={styles.btn} onClick={logoutAll}>
            Log Out
          </div>
          <div className={styles.btnsecond} onClick={logoutHandler}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
