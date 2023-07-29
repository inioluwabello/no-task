import { TaskCard } from './TaskCard';
import { getBoardTasksAsync, getSelectedBoard, selectTasks, useDispatch, useSelector } from '@/lib/redux';
import { useEffect, useState, useRef } from 'react';

export const TaskList = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks)
    const selectedBoard = useSelector(getSelectedBoard)

    const statusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if ((!tasks || tasks.length === 0) && selectedBoard)
            dispatch(getBoardTasksAsync(selectedBoard._id))
    }, [tasks])

    const statusArray = [...new Set(tasks.map(task => task.status))];

    const renderTasksByStatus = (status: string) => {

        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard key={task._id} task={task} />
            ));
    };

    const countTasksByStatus = (status: string) => {
        return (tasks.filter((task) => task.status === status)).length
    }

    const [newClEditorVisible, setNewClEditorVisible] = useState(false)
    useEffect(() => {
        // Focus the input element when newClEditorVisible is set to true
        if (newClEditorVisible && statusRef.current) {
            statusRef.current.focus();
        }
    }, [newClEditorVisible]);

    const handleNewColumnCLick = () => {
        setNewClEditorVisible(true);
    }

    const [newStatusName, setNewStatusName] = useState('');
    const handleStatusInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewStatusName(e.target.value)
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            setNewClEditorVisible(false);
        }
    }

    const [newTask, setNewTask] = useState('');
    const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTask(e.target.value)
    }

    const handleNewTaskEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            // dispatch new task addition
            setNewTaskEditorVisible(false);
        }
    }

    const [newTaskEditorVisible, setNewTaskEditorVisible] = useState(true)
    



    return (
        <div className="task-board">
            <div className="flex">
                {statusArray.map(status => {
                    return (
                    <div key={status} className="column">
                        <h2 className='alt-text'>{status} ({countTasksByStatus(status)})</h2>
                        {renderTasksByStatus(status)}
                    </div>
                    )
                })}
                <div className="column new-column">
                    <h2
                        onClick={handleNewColumnCLick}
                        className={`
                        ${newClEditorVisible === false ? '' : 'd-none'}
                        ${newStatusName === '' ? `alt-pry-text` : 'alt-text'} pointer
                        `}
                    >{newStatusName === '' ? `+ New Column` : newStatusName.toLocaleUpperCase()}</h2>

                    <input type="text"
                        onChange={handleStatusInput}
                        onKeyDown={handleEnterPress}
                        value={newStatusName}
                        className={`${newClEditorVisible === true ? '' : 'd-none'} alt-text new-status`}
                        ref={statusRef} />

                    {newStatusName !== '' && newClEditorVisible === false &&
                        <div className="add-task">
                            <input type="text" 
                                className="new-task"
                                placeholder='Add new task' />
                        </div>
                    }
                </div>

                <div style={{width: "2em"}}></div>
            </div>
        </div>
    );
};
