import React from 'react';
import styles from './NoteItem.module.css';

import { ChevronRightIcon } from '@heroicons/react/solid';

type Props = {
  title: string;
  content: string;
  onClick: (content: string, title: string) => void;
};

const NoteItem = ({ title, content, onClick }: Props) => {
  return (
    <div
      className={styles.note}
      onClick={() => {
        onClick(content, title);
      }}
    >
      <ChevronRightIcon className={styles.icon} /> {title}
    </div>
  );
};

export default NoteItem;
