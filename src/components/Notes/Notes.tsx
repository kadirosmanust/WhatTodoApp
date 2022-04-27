/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import styles from './Notes.module.css';
import NoteDetail from '../NoteDetail/NoteDetail';
import { useAppSelector } from '../../store/store';
import { getNotes } from '../../store/reducers/Notes/noteSlice';
import NoteList from '../NoteList/NoteList';

type Props = { createNoteHandler: () => void };

const Notes = ({ createNoteHandler }: Props) => {
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const { data, error, pending } = useAppSelector(getNotes);

  const detailHandler = (content: string, title: string, id: string) => {
    setDetails(content);
    setTitle(title);
    setId(id);
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
      <NoteDetail id={id} title={title} details={details} />
    </div>
  );
};

export default Notes;
