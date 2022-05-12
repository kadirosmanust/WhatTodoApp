import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { createNote } from '@/store/reducers/Notes/noteSlice';
import type { Note } from '@/types/types';
import { useAppDispatch } from '@/store/store';

import styles from './NewNote.module.css';

type Props = { exitHandler: () => void };
type NoteInput = {
  title: string;
  detail: string;
  url: string;
};
const NewNote = ({ exitHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteInput>({ mode: 'onTouched' });
  const dispatch = useAppDispatch();

  const submitHandler = handleSubmit(({ detail, title, url }) => {
    const note: Note = {
      title: title,
      note: detail,
      url: url,
      id: v4(),
    };

    dispatch(createNote(note));
    exitHandler();
  });

  const newNoteOptions = {
    url: {},
    title: { required: 'Title is required.' },
    details: {},
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
          <input
            className={styles.input}
            type='text'
            {...register('title', newNoteOptions.title)}
          />
          <label>Image Url</label>
          <input
            className={styles.input}
            type='url'
            {...register('url', newNoteOptions.url)}
          />
          <label>Content</label>
          <input
            className={styles.content}
            type='text'
            {...register('detail', newNoteOptions.details)}
          />
          <button type='submit'>Add Note</button>
        </form>
      </div>
      <div className={styles.darkmodal} onClick={exitHandler}></div>
    </div>
  );
};

export default NewNote;
