import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../store/reducers/Notes/noteSlice';
import styles from './NewNote.module.css';
import type { Note } from '../../types/types';
import { v4 } from 'uuid';

type Props = { exitHandler: () => void };

const NewNote = ({ exitHandler }: Props) => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      title.current.value.trim() === '' ||
      content.current.value.trim() === ''
    ) {
      return;
    }
    const note: Note = {
      title: title.current.value,
      note: content.current.value,
      id: v4(),
    };

    dispatch(createNote(note));
    exitHandler();
  };

  return (
    <div className={styles.center}>
      <div className={styles.modal}>
        <div className={styles.exit}>
          <div className={styles.exitbtn} onClick={exitHandler}>
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
        <form className={styles.form} onSubmit={submitHandler}>
          <label>Title</label>
          <input className={styles.input} type='text' ref={title} />
          <label>Content</label>
          <input className={styles.content} type='text' ref={content} />
          <button type='submit'>Add Note</button>
        </form>
      </div>
      <div className={styles.darkmodal} onClick={exitHandler}></div>
    </div>
  );
};

export default NewNote;
