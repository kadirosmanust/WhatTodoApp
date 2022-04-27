import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState } from '../../store';
import { httpPost } from '../../../utils/helpers/httpHelper';
import type { Note } from '../../../types/types';

export type NotesState = {
  data: { username: string; notes: Note[] };
  pending: boolean;
  error: boolean;
};

const initialState: NotesState = {
  data: { username: '', notes: [] },
  pending: false,
  error: false,
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
      'http://localhost:3000/api/utils/new-note',
      note
    )) as AxiosResponse;

    return note;
  }
);

export const deleteNote: any = createAsyncThunk(
  'notes/deleteNote',
  async (note: Note, thunkAPI) => {
    const response = (await axios.post(
      'http://localhost:3000/api/utils/delete-note',
      note
    )) as AxiosResponse;

    return note;
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
      state.pending = false;
      state.data.notes = [...state.data.notes, payload];
    },
    [createNote.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [deleteNote.pending](state) {
      state.pending = true;
    },
    [deleteNote.fulfilled](state, { payload }) {
      state.pending = false;
      const notes = state.data.notes.filter(
        (note) => note.id !== payload.id
      ) as any;
      state.data.notes = [...notes];
    },
    [deleteNote.rejected](state) {
      state.pending = false;
      state.error = true;
    },
  },
});

export const getNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
