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
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const { data, error, pending } = useAppSelector(getNotes);

  const detailHandler = (
    content: string,
    title: string,
    id: string,
    url: string
  ) => {
    setDetails(content);
    setTitle(title);
    setId(id);
    setUrl(url);
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
      <NoteDetail id={id} title={title} details={details} url={url} />
    </div>
  );
};

export default Notes;
