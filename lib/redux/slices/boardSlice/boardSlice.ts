import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { archiveTaskByStatus, deleteBoard, deleteTask, deleteTaskByStatus, fetchBoards, fetchBoardTasks, putNewBoard, putNewStatus, putNewTask, updateTaskByStatus, updateTaskStatus } from './asyncTasks';
import { BoardSliceState, DeleteBoardResult, IBoard, ITask, NewBoardResult } from '@/lib/interfaces';


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
  async (payload: {task: ITask, boardId: string}) => {
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

export const createNewBoardAsync = createAsyncThunk(
  'board/createNewBoardAsync',
  async (payload: { title: string }) => {
    return putNewBoard(payload);
  }
);

export const deleteBoardAsync = createAsyncThunk(
  'board/deleteBoardAsync',
  async (boardId: string) => {
    const payload = {
      boardId: boardId
    }
    return deleteBoard(payload);
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  'board/updateTaskStatusAsync',
  async (payload: { taskId: string, status: string }) => {
    return updateTaskStatus(payload);
  }
);

export const updateTaskByStatusAsync = createAsyncThunk(
  'board/updateTaskByStatusAsync',
  async (payload: { boardId: string, oldStatus: string, newStatus: string, color?: string }) => {
    return updateTaskByStatus(payload);
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'board/deleteTaskAsync',
  async (payload: { taskId: string }) => {
    return deleteTask(payload);
  }
);

export const createNewStatusAsync = createAsyncThunk(
  'board/createNewStatusAsync',
  async (payload: { status: string, color: string, boardId: string }) => {
    return putNewStatus(payload);
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
    selectBoard: (state, action: PayloadAction<IBoard | undefined>) => {
      state.selectedBoard = action.payload;
    },
    resetBoard: (state) => {
      state.selectedBoard = undefined;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardsAsync.fulfilled, (state, action: PayloadAction<IBoard[]>) => {
        state.status = 'idle';
        state.boards = action.payload;
        state.selectedBoard = state.boards[0];
      })

      .addCase(getBoardTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardTasksAsync.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })

      .addCase(createNewTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTaskAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      })

      .addCase(deleteTaskInStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskInStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board, tasks } = action.payload;
        state.selectedBoard = board;
        state.tasks = tasks;
      })

      .addCase(archiveTaskInStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveTaskInStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board, tasks } = action.payload;
        state.selectedBoard = board;
        state.tasks = tasks;
      })

      .addCase(createNewBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewBoardAsync.fulfilled, (state, action: PayloadAction<NewBoardResult>) => {
        state.status = 'idle';
        state.boards = action.payload.boards;
        state.selectedBoard = action.payload.newBoard
        state.tasks = [];
      })

      .addCase(deleteBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBoardAsync.fulfilled, (state, action: PayloadAction<DeleteBoardResult>) => {
        state.status = 'idle';
        state.boards = action.payload.boards;

        // Check if the deleted board was the selected board
        if (state.selectedBoard && state.selectedBoard._id === action.payload.deletedBoardId) {
          state.selectedBoard = undefined;
          state.tasks = [];
        }
      })

      .addCase(updateTaskStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.status = 'idle';

        const taskIndex = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload
        }
      })

      .addCase(updateTaskByStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskByStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board, tasks } = action.payload;
        state.selectedBoard = board;
        state.tasks = tasks;
      })

      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { deletedTaskId, message } = action.payload;
        state.tasks = state.tasks.filter((f) => f._id !== deletedTaskId)
      })

      .addCase(createNewStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board } = action.payload;
        state.selectedBoard = board;
      })
  },
});
