import React, { useEffect, useState } from 'react';
import { deleteNote } from '../../store/reducers/Notes/noteSlice';
import { useAppDispatch } from '../../store/store';
import styles from './NoteDetail.module.css';

type Props = { title: string; details: string; id: string };

const NoteDetail = ({ title, details, id }: Props) => {
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

  return (
    <div className={styles.detail}>
      {!isDeleted && title && (
        <>
          <div className={styles.detailheader}>
            <h1>{title}</h1>
            <div className={styles.delete} onClick={deleteNoteHandler}>
              Delete Note
            </div>
          </div>
          <div className={styles.detailbody}>{details}</div>
        </>
      )}
    </div>
  );
};

export default NoteDetail;
