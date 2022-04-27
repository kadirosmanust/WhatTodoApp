import React from 'react';
import styles from './NoteItem.module.css';

import { ChevronRightIcon } from '@heroicons/react/solid';

type Props = {
  title: string;
  id: string;
  content: string;
  onClick: (content: string, title: string, id: string) => void;
};

const NoteItem = ({ id, title, content, onClick }: Props) => {
  return (
    <div
      className={styles.note}
      onClick={() => {
        onClick(content, title, id);
      }}
    >
      <ChevronRightIcon className={styles.icon} /> {title}
    </div>
  );
};

export default NoteItem;
