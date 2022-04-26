import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../src/store/reducers/Notes/noteSlice';
import styles from './index.module.css';
import type { Note } from '../../src/types/types';
import { v4 } from 'uuid';

type Props = {};

const NewTodoPage = (props: Props) => {
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
  };

  return (
    <div className='center'>
      <form className={styles.form} onSubmit={submitHandler}>
        <label>Title</label>
        <input className={styles.input} type='text' ref={title} />
        <label>Content</label>
        <input className={styles.content} type='text' ref={content} />
        <button type='submit'>Add Note</button>
      </form>
    </div>
  );
};

export default NewTodoPage;
