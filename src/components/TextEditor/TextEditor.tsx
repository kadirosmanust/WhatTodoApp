import React from 'react';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import type { Note } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { updateNotes, getNotes } from '../../store/reducers/Notes/noteSlice';
import { debounce } from 'lodash';

import styles from './TextEditor.module.css';

type Props = { note: Note };

const TextEditor = ({ note }: Props) => {
  const dispatch = useAppDispatch();
  const { updating } = useAppSelector(getNotes);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,

        TaskList,
        TaskItem.configure({
          nested: false,
        }),
      ],
      editorProps: {
        attributes: {
          class: styles.inner,
        },
      },
      content: `
    ${note.note}
      `,
      onUpdate: debounce(({ editor }) => {
        const updatedNote: Note = {
          id: note.id,
          url: note.url,
          title: note.title,
          note: editor.getHTML(),
        };
        dispatch(updateNotes(updatedNote));
      }, 2000),
    },
    [note]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <div className={styles.loading}>{updating && <p>Saving...</p>}</div>
      {editor && (
        <BubbleMenu
          className={styles.bublemenu}
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}
          >
            toggleTaskList
          </button>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          className={styles.floatingmenu}
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            H2
          </button>
        </FloatingMenu>
      )}

      <EditorContent className={styles.denme} editor={editor} />
    </div>
  );
};

export default TextEditor;
