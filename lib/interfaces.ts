
export interface BoardSliceState {
    boards: IBoard[];
    selectedBoard?: IBoard;
    tasks: ITask[];
    status: 'idle' | 'loading' | 'failed';
}

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

export interface NewBoardResult {
    boards: IBoard[],
    newBoard: IBoard 
}

export interface DeleteBoardResult{
    boards: IBoard[]
    deletedBoardId: string
    message: string
}