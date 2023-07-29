import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { archiveTaskByStatus, deleteTaskByStatus, fetchBoards, fetchBoardTasks, putNewTask } from './asyncTasks';
import { BoardSliceState, IBoard } from '@/lib/interfaces';


const initialState: BoardSliceState = {
  boards: [],
  tasks: [],
  status: 'idle',
};

export const getBoardsAsync = createAsyncThunk('board/fetchBoardsAsync', async () => {
  const response = await fetchBoards();
  return response;
});

export const getBoardTasksAsync = createAsyncThunk('board/fetchBoardTasksAsync', async (id: string) => {
  const response = await fetchBoardTasks(id);
  return response;
});

export const createNewTaskAsync = createAsyncThunk(
  'board/createNewTaskAsync',
  async (payload: { boardId: string; title: string; status: string }) => {
    return putNewTask(payload);
  }
);

export const deleteTaskInStatusAsync = createAsyncThunk(
  'board/deleteTaskInStatusAsync',
  async (payload: { boardId: string; status: string }) => {
    return deleteTaskByStatus(payload);
  }
);

export const archiveTaskInStatusAsync = createAsyncThunk(
  'board/archiveTaskInStatusAsync',
  async (payload: { boardId: string; status: string }) => {
    return archiveTaskByStatus(payload);
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
    selectBoard: (state, action: PayloadAction<IBoard>) => {
      state.selectedBoard = action.payload;
    }
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
      })

      .addCase(createNewTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTaskAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      })

      .addCase(deleteTaskInStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskInStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })

      .addCase(archiveTaskInStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveTaskInStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })
  },
});
