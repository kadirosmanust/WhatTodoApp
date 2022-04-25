import React from 'react';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';
import { v4 } from 'uuid';

type Note = {
  title: string;
  id: string;
  note: string;
};

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
          {notesData.notes.map((note) => {
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
