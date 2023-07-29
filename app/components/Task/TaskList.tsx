import { TaskCard } from './TaskCard';
import { createNewTaskAsync, getBoardTasksAsync, getSelectedBoard, selectTasks, useDispatch, useSelector } from '@/lib/redux';
import { useEffect, useState, useRef } from 'react';
import { NewTask } from './NewTask';

export const TaskList = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks)
    const selectedBoard = useSelector(getSelectedBoard)

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
                
                <NewTask selectedBoard={selectedBoard} statusArray={statusArray} />

                <div style={{width: "2em"}}></div>
            </div>
        </div>
    );
};
