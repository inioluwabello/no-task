import { getBoardTasksAsync, getSelectedBoard, selectTasks, useDispatch, useSelector } from '@/lib/redux';
import { useEffect } from 'react';
import { NewTask } from './NewTask';
import { StatusColumn } from './StatusColumn';

export const TaskList = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks)
    const selectedBoard = useSelector(getSelectedBoard)

    useEffect(() => {
        if ((!tasks || tasks.length === 0) && selectedBoard)
            dispatch(getBoardTasksAsync(selectedBoard._id))
    }, [tasks])

    const statusArray = [...new Set(tasks.map(task => task.status))];

    
    return (
        <div className="task-board">
            <div className="flex">
                {statusArray.map(status => {
                    return (
                        <StatusColumn key={status} selectedBoard={selectedBoard} tasks={tasks} status={status} />
                    )
                })}
                
                <NewTask selectedBoard={selectedBoard} statusArray={statusArray} />

                <div style={{width: "2em"}}></div>
            </div>
        </div>
    );
};
