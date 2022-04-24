import React from 'react';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';

type Props = {};

const NoteList = (props: Props) => {
  return (
    <div className={styles.list}>
      <ul className={styles.ul}>
        <li>
          <NoteItem />
        </li>
        <li>
          <NoteItem />
        </li>
        <li>
          <NoteItem />
        </li>
        <li>
          <NoteItem />
        </li>
      </ul>
    </div>
  );
};

export default NoteList;
