import { ITask } from "@/lib/interfaces";
import { deleteTaskAsync, useDispatch } from "@/lib/redux";
import { useState } from 'react'

interface TakListProps {
    task: ITask
}

export const TaskCard = ({ task }: TakListProps) => {

    const dispatch = useDispatch();
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: ITask) => {
        e.dataTransfer.setData('task', JSON.stringify(task))
    }

    const [taskIconVisible, setTaskIconVisible] = useState(false)

    return (
        <div key={task._id} 
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onMouseEnter={() => setTaskIconVisible(true)}
            onMouseLeave={() => setTaskIconVisible(false)}
            className="task-card pointer">
            <div className="space-between">
                <h3>{task.title}</h3>
                {taskIconVisible  && <img src="/images/icon-cross.svg" 
                    width={10}
                    height={10}
                    className="pointer"
                    onClick={() => dispatch(deleteTaskAsync({ taskId: task._id! }))}
                    alt="close" />}
            </div>
            <p className="alt-text">{task.description}</p>
        </div>
    );
};