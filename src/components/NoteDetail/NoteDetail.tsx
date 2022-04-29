import React, { useEffect, useState } from 'react';
import { deleteNote } from '../../store/reducers/Notes/noteSlice';
import { useAppDispatch } from '../../store/store';
import Footer from '../layout/Footer';
import styles from './NoteDetail.module.css';

type Props = { title: string; details: string; id: string; url: string };

const NoteDetail = ({ title, details, id, url }: Props) => {
  const dispatch = useAppDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    setIsDeleted(false);
  }, [id]);
  const deleteNoteHandler = () => {
    const note = {
      title: title,
      note: details,
      id: id,
    };
    dispatch(deleteNote(note));
    setIsDeleted(true);
  };
  const imageUrl = url
    ? url
    : 'https://images.unsplash.com/photo-1650658765456-8c0e3d515b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  return (
    <div className={styles.detail}>
      {!isDeleted && title && (
        <>
          <div className={styles.img}>
            <img src={imageUrl}></img>
          </div>
          <div className={styles.detailheader}>
            <div className={styles.delete} onClick={deleteNoteHandler}>
              Delete
            </div>
          </div>
          <div className={styles.title}>
            <h1>{title}</h1>
          </div>
          <div className={styles.detailbody}>{details}</div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default NoteDetail;
