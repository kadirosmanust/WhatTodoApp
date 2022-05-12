import React, { useEffect, useState } from 'react';

import { deleteNote } from '@/store/reducers/Notes/noteSlice';
import { useAppDispatch } from '@/store/store';
import Footer from '../layout/Footer';
import TextEditor from '../TextEditor/TextEditor';
import type { Note } from '@/types/types';

import styles from './NoteDetail.module.css';

type Props = { note: Note };

const NoteDetail = ({ note }: Props) => {
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    setIsDeleted(false);
  }, [note]);
  const deleteNoteHandler = () => {
    const dnote = {
      title: note.title,
      note: note.note,
      id: note.id,
    };
    dispatch(deleteNote(dnote));
    setIsDeleted(true);
  };
  const imageUrl = note?.url
    ? note.url
    : 'https://images.unsplash.com/photo-1650658765456-8c0e3d515b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  return (
    <div className={styles.detail}>
      {!isDeleted && note?.title && (
        <>
          <div className={styles.img}>
            <img src={imageUrl} alt='Title' />
          </div>
          <div className={styles.detailheader}>
            <div className={styles.delete} onClick={deleteNoteHandler}>
              Delete
            </div>
          </div>
          <div className={styles.title}>
            <h1>{note.title}</h1>
          </div>
          <div className={styles.detailbody}>
            <TextEditor note={note} />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default NoteDetail;
