import useSWR from 'swr'
import { TaskCard } from './TaskCard';
import { ITask, getBoardTasksAsync, getSelectedBoard, selectTasks, useDispatch, useSelector } from '@/lib/redux';
import { useEffect } from 'react';

// const fetcher = async (url: string) => {
//     const response = await fetch(url);
//     return response.json();
// };

export const TaskList = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks)
    const selectedBoard = useSelector(getSelectedBoard)

    useEffect(() => {
        if ((!tasks || tasks.length === 0) && selectedBoard)
            dispatch(getBoardTasksAsync(selectedBoard._id))
    })
    const statusArray = [...new Set(tasks.map(task => task.status))];

    const renderTasksByStatus = (status: string) => {

        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard key={task._id} task={task} />
            ));
    };

    return (
        <div className="task-board">
            <div className="flex">
                {statusArray.map(status => {
                    return <div key={status} className="column">
                        <h2>{status}</h2>
                        {renderTasksByStatus(status)}
                    </div>
                })}
            </div>
        </div>
    );
};
