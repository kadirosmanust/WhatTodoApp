import React from 'react';
import styles from './NoteItem.module.css';

import { ChevronRightIcon } from '@heroicons/react/solid';

type Props = { title: string; content: string };

const NoteItem = ({ title, content }: Props) => {
  return (
    <div className={styles.note}>
      <ChevronRightIcon className={styles.icon} /> {title}
    </div>
  );
};

export default NoteItem;
