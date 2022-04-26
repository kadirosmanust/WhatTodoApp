import React from 'react';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';
import type { Note } from '../../types/types';

type Props = {
  notesData: { username: string; notes: Note[] };
  pending: boolean;
  error: boolean;
};

const NoteList = ({ notesData, pending, error }: Props) => {
  return (
    <div className={styles.list}>
      {!error && !pending && (
        <ul className={styles.ul}>
          {notesData.notes &&
            notesData.notes.map((note) => {
              return (
                <li key={note.id}>
                  <NoteItem title={note.title} content={note.note} />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
