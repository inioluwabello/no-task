import { IBoard, ITask } from "./boardSlice";

export const fetchBoardTasks = async (apiUrl: string, id: string): Promise<ITask[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/boards/${id}/tasks`, {
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

export const fetchBoards = async (apiUrl: string): Promise<IBoard[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/boards`, {
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
