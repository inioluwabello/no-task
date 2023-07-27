import { ITask } from './TaskList';

interface TakListProps {
    task: ITask
}

export const TaskCard = ({ task }: TakListProps) => {

    return (
        <div className="task-card">
            <div key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>
        </div>
    );
};