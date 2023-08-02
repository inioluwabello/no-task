import { IBoard } from '@/lib/interfaces';
import { createNewTaskAsync, useDispatch } from '@/lib/redux';
import {useState} from 'react'
export const NewInlineTask = ({ 
    isVisible,
    selectedBoard,
    status
 }: { 
        isVisible: boolean
        selectedBoard?: IBoard,
        status: string
}) => {

    const [newTaskTitle, setNewTask] = useState('');
    const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTask(e.target.value)
    }

    const dispatch = useDispatch();

    const handleNewTaskEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Dispatch the new task addition
            if (newTaskTitle !== '') {
                try {
                    const payload = {
                        boardId: selectedBoard?._id ?? '',
                        task: {
                            title: newTaskTitle,
                            status: status,
                            description: '',
                            subTasks: []
                        }

                    };

                    await dispatch(createNewTaskAsync(payload));
                    setNewTask('');
                } catch (error) {
                    console.error('Error creating a new task:', error);
                }
            }
        }
    };
    
    return (
        isVisible &&
        <div className="add-task task-card">
            <input type="text"
                className="new-task new-task-inline"
                onChange={handleNewTaskInput}
                onKeyDown={handleNewTaskEnterPress}
                value={newTaskTitle}
                placeholder='Add a new task' />

        </div>
    )
}