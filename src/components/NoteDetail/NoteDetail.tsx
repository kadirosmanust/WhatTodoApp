import React from 'react';
import styles from './NoteDetail.module.css';

type Props = { title: string; details: string };

const NoteDetail = ({ title, details }: Props) => {


  return (
    <div className={styles.detail}>
      {title && (
        <>
          <div className={styles.detailheader}>
            <h1>{title}</h1>
            <div className={styles.delete}>Delete Note</div>
          </div>
          <div className={styles.detailbody}>{details}</div>
        </>
      )}
    </div>
  );
};

export default NoteDetail;
