import React from 'react';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';

type Props = {
  notesData: { username: string; notes: any[] };
  pending: boolean;
  error: boolean;
};

const NoteList = ({ notesData, pending, error }: Props) => {
  return (
    <div className={styles.list}>
      {!error && !pending && (
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
      )}
    </div>
  );
};

export default NoteList;
