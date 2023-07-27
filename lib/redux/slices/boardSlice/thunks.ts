import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchBoardTasks, fetchBoards } from './asyncTasks'

export const getBoardTasksAsync = createAppAsyncThunk(
  'board/fetchBoardTasksAsync',
  async (id: string) => {
    const response = await fetchBoardTasks(id)
    return response
  }
)

export const getBoardsAsync = createAppAsyncThunk(
  'board/fetchBoardsAsync',
  async () => {
    const response = await fetchBoards()
    return response
  }
)