import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '../../store';
import { httpPost } from '../../../utils/helpers/httpHelper';
type Note = {
  title: string;
  id: string;
  note: string;
};

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
  },
});

export const getNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
