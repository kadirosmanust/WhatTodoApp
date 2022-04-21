import SignInUp from '../../components/UI/SignInUp';
import styles from './index.module.css';

const Welcome = () => {
  return (
    <div className={styles.center}>
      <div className={styles.black}>WhatTodo</div>
      <div className={styles.paragraph}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa
        amet, nam ex ratione deserunt, quia at sapiente vero laborum fugiat
        nobis fugit, quaerat eum pariatur. Enim saepe ducimus similique?
      </div>
      <div className={styles.credit}>
        Made by{' '}
        <a className={styles.link} href='https://github.com/KadoRaw'>
          KadoRaw
        </a>
      </div>
      <SignInUp />
    </div>
  );
};

export default Welcome;
