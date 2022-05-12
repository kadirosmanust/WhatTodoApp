import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState } from '@/store/store';
import { httpPost } from '@/utils/helpers/httpHelper';
import type { Note } from '@/types/types';

export type NotesState = {
  data: { username: string; notes: Note[] };
  pending: boolean;
  error: boolean;
  updating: boolean;
};

const initialState: NotesState = {
  data: { username: '', notes: [] },
  pending: false,
  error: false,
  updating: false,
};

export const fetchNotes: any = createAsyncThunk(
  'notes/fetchNotes',
  async (username: string, thunkAPI) => {
    const response = (await httpPost(
      '/api/data/notes',
      username
    )) as AxiosResponse;

    return response.data;
  }
);

export const createNote: any = createAsyncThunk(
  'notes/createNote',
  async (note: Note, thunkAPI) => {
    const response = (await axios.post(
      'https://what-todo-app.vercel.app//api/utils/new-note',
      note
    )) as AxiosResponse;

    const payload = { status: response.status, note };
    return payload;
  }
);

export const deleteNote: any = createAsyncThunk(
  'notes/deleteNote',
  async (note: Note, thunkAPI) => {
    const response = (await axios.post(
      'https://what-todo-app.vercel.app//api/utils/delete-note',
      note
    )) as AxiosResponse;
    const payload = { status: response.status, note };
    return payload;
  }
);

export const updateNotes: any = createAsyncThunk(
  'notes/updateNotes',
  async (note: Note, thunkAPI) => {
    const response = (await axios.post(
      'https://what-todo-app.vercel.app//api/utils/update-note',
      note
    )) as AxiosResponse;
    const payload = { status: response.status, note };
    return payload;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotes.pending](state) {
      state.pending = true;
    },
    [fetchNotes.fulfilled](state, { payload }) {
      if (payload.status === 304) {
        return;
      }
      state.pending = false;
      state.data = payload;
    },
    [fetchNotes.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [createNote.pending](state) {
      state.pending = true;
    },
    [createNote.fulfilled](state, { payload }) {
      if (payload.status === 304) {
        return;
      }
      state.pending = false;
      state.data.notes = [...state.data.notes, payload.note];
    },
    [createNote.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [deleteNote.pending](state) {
      state.pending = true;
    },
    [deleteNote.fulfilled](state, { payload }) {
      if (payload.status === 304) {
        return;
      }
      const pNote = payload.note;
      state.pending = false;
      const notes = state.data.notes.filter(
        (note) => note.id !== pNote.id
      ) as any;
      state.data.notes = [...notes];
    },
    [deleteNote.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [updateNotes.pending](state) {
      state.updating = true;
    },
    [updateNotes.fulfilled](state, { payload }) {
      if (payload.status === 304) {
        return;
      }
      const pNote = payload.note;
      state.updating = false;
      const notes = state.data.notes.filter(
        (note) => note.id !== pNote.id
      ) as any;
      notes.push(pNote);
      state.data.notes = [...notes];
    },
    [updateNotes.rejected](state) {
      state.updating = false;
      state.error = true;
    },
  },
});

export const getNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
