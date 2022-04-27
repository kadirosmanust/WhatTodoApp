/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import styles from './Notes.module.css';
import NoteDetail from '../NoteDetail/NoteDetail';
import { useAppSelector } from '../../store/store';
import { getNotes } from '../../store/reducers/Notes/noteSlice';
import NoteList from '../NoteList/NoteList';

type Props = { createNoteHandler: () => void };

const Notes = ({ createNoteHandler }: Props) => {
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const { data, error, pending } = useAppSelector(getNotes);

  const detailHandler = (content: string, title: string) => {
    setDetails(content);
    setTitle(title);
  };

  return (
    <div className={styles.notes}>
      <NoteList
        createNoteHandler={createNoteHandler}
        notesData={data}
        error={error}
        pending={pending}
        detailHandler={detailHandler}
      />
      <NoteDetail title={title} details={details} />
    </div>
  );
};

export default Notes;
