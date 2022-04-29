import React from 'react';
import styles from './NoteItem.module.css';

import { ChevronRightIcon } from '@heroicons/react/solid';

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
      <ChevronRightIcon className={styles.icon} /> {title}
    </div>
  );
};

export default NoteItem;
