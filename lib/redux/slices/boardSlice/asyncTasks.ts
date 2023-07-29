import { IBoard, ITask } from "@/lib/interfaces";

const API_URL = "http://localhost:3001";

export const fetchBoardTasks = async (id: string): Promise<ITask[]> => {
  try {
    const response = await fetch(`${API_URL}/api/boards/${id}/tasks`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      // Handle internal server error or other non-successful responses here
      console.error(`Error fetching board tasks. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    // Handle network or other errors here
    console.error("Error fetching board tasks:", error);
    return [];
  }
};

export const fetchBoards = async (): Promise<IBoard[]> => {
  try {
    const response = await fetch(`${API_URL}/api/boards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      // Handle internal server error or other non-successful responses here
      console.error(`Error fetching boards. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    // Handle network or other errors here
    console.error("Error fetching boards:", error);
    return [];
  }
};

export const putNewTask = async (payload: { boardId: string; title: string; status: string }) => {
  try {
    // Assuming you have a function to create a new task in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: payload.title,
        status: payload.status,
        // Add other task properties as needed
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating a new task');
    }

    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error('Error creating a new task:', error);
    throw error;
  }
};

export const deleteTaskByStatus = async (payload: { boardId: string; status: string }) => {
  try {
    // Assuming you have a function to delete tasks by status in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks/status/${payload.status}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error deleting tasks by status');
    }

    const remainingTasks = await response.json();
    return remainingTasks;
  } catch (error) {
    console.error('Error deleting tasks by status:', error);
    throw error;
  }
};

export const archiveTaskByStatus = async (payload: { boardId: string; status: string }) => {
  try {
    // Assuming you have a function to delete tasks by status in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks/archive/${payload.status}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error deleting tasks by status');
    }

    const remainingTasks = await response.json();
    return remainingTasks;
  } catch (error) {
    console.error('Error deleting tasks by status:', error);
    throw error;
  }
};
