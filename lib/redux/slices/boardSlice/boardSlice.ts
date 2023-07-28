import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBoards, fetchBoardTasks } from './asyncTasks';

const API_URL = "http://localhost:3001";

export interface BoardSliceState {
  boards: IBoard[];
  selectedBoard?: IBoard;
  tasks: ITask[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BoardSliceState = {
  boards: [],
  tasks: [],
  status: 'idle',
};

export const getBoardsAsync = createAsyncThunk('board/fetchBoardsAsync', async () => {
  const response = await fetchBoards(API_URL);
  return response;
});

export const getBoardTasksAsync = createAsyncThunk('board/fetchBoardTasksAsync', async (id: string) => {
  const response = await fetchBoardTasks(API_URL, id);
  return response;
});

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = action.payload;
        state.selectedBoard = state.boards[0];
      })
      .addCase(getBoardTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardTasksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks = action.payload;
      });
  },
});

export interface IBoard {
  _id: string;
  title: string;
  statuses: string[];
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  assignees: string[];
  comments: string[];
}
