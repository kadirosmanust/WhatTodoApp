import React from 'react';
import styles from './NoteItem.module.css';

import { ChevronRightIcon } from '@heroicons/react/solid';

type Props = {};

const NoteItem = (props: Props) => {
  return (
    <div className={styles.note}>
      <ChevronRightIcon className={styles.icon} /> NoteItem
    </div>
  );
};

export default NoteItem;
