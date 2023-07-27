import { IBoard, ITask } from "./boardSlice";

const API_URL = "http://localhost:3001"

export const fetchBoardTasks = async (id: string): Promise<ITask[]> => {
  const response = await fetch(`${API_URL}/api/boards/${id}/tasks`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json()
}

export const fetchBoards = async (): Promise<IBoard[]> => {
  const response = await fetch(`${API_URL}/api/boards`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json()
}
