/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

import NoteDetail from '../NoteDetail/NoteDetail';
import { useAppSelector } from '../../store/store';
import { getNotes } from '../../store/reducers/Notes/noteSlice';
import NoteList from '../NoteList/NoteList';
import type { Note } from '../../types/types';

import styles from './Notes.module.css';

type Props = { createNoteHandler: () => void };

const Notes = ({ createNoteHandler }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<Note>(null);
  const { data, error, pending } = useAppSelector(getNotes);

  const detailHandler = (
    content: string,
    title: string,
    id: string,
    url: string
  ) => {
    setNote({ id: id, note: content, title: title, url: url });
  };
  return (
    <div className={styles.notes}>
      <div
        className={styles.mobilemenu}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </div>
      <NoteList
        createNoteHandler={createNoteHandler}
        isOpen={isOpen}
        notesData={data}
        error={error}
        pending={pending}
        detailHandler={detailHandler}
      />
      <NoteDetail note={note} />
    </div>
  );
};

export default Notes;
