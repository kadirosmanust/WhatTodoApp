import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>WhatTodo. Powerful notes.</div>
    </footer>
  );
};

export default Footer;
