/* eslint-disable react/jsx-key */
import React from 'react';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';
import type { Note } from '../../types/types';

type Props = {
  notesData: { username: string; notes: Note[] };
  pending: boolean;
  error: boolean;
  detailHandler: (content: string, title: string) => void;
  createNoteHandler: () => void;
};

const NoteList = ({
  notesData,
  pending,
  error,
  detailHandler,
  createNoteHandler,
}: Props) => {
  return (
    <div className={styles.list}>
      {!pending && (
        <div className={styles.create} onClick={createNoteHandler}>
          Create Note
        </div>
      )}
      {pending && <p>Loading...</p>}
      {!pending && <p>Hello {notesData.username}</p>}

      {!error && !pending && (
        <ul className={styles.ul}>
          {notesData.notes &&
            notesData.notes.map((note) => {
              return (
                <li key={note.id}>
                  <NoteItem
                    key={note.id}
                    title={note.title}
                    content={note.note}
                    onClick={detailHandler}
                  />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
