import { ITask } from "@/lib/interfaces";

interface TakListProps {
    task: ITask
}

export const TaskCard = ({ task }: TakListProps) => {

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: ITask) => {
        e.dataTransfer.setData('task', JSON.stringify(task))
    }
    return (
        <div key={task._id} 
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            className="task-card pointer">
            <h3>{task.title}</h3>
            <p className="alt-text">{task.description}</p>
        </div>
    );
};