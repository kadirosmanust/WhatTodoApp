import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';

import styles from './NoteItem.module.css';

type Props = {
  title: string;
  id: string;
  content: string;
  url: string;
  onClick: (content: string, title: string, id: string, url: string) => void;
};

const NoteItem = ({ id, title, content, onClick, url }: Props) => {
  return (
    <div
      className={styles.note}
      onClick={() => {
        onClick(content, title, id, url);
      }}
    >
      <ChevronRightIcon className={styles.icon} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default NoteItem;
