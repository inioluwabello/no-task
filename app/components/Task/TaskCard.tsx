import { ITask } from "@/lib/interfaces";

interface TakListProps {
    task: ITask
}

export const TaskCard = ({ task }: TakListProps) => {

    return (
        <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p className="alt-text">{task.description}</p>
        </div>
    );
};