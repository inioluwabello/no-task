import { IBoard, ITask } from "@/lib/interfaces";
import { TaskCard } from "./TaskCard";
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { StatusActions } from "./StatusActions";

export const StatusColumn = ({ status, tasks, selectedBoard }: { status: string, tasks: ITask[], selectedBoard?: IBoard }) => {
    const [showingStatusActions, setShowingStatusActions] = useState(false);
    const statusActionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // Check if the click occurred inside or outside the dropdown
            if (statusActionsRef.current && !statusActionsRef.current.contains(event.target as Node)) {
                setShowingStatusActions(false);
            }
        };

        document.addEventListener("click", handleClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [showingStatusActions]);

    const renderTasksByStatus = (status: string) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard key={task._id} task={task} />
            ));
    };

    const countTasksByStatus = (status: string) => {
        return (tasks.filter((task) => task.status === status)).length;
    };

    const handleOptionsClick = () => {
        setShowingStatusActions(!showingStatusActions);
    };

    const onCloseDropdown = () => {
        setShowingStatusActions(false);
    }

    const [showOptionButton, setShowOptionButton] = useState(false)

    return (
        <div className="column" onMouseEnter={() => setShowOptionButton(true)} onMouseLeave={() => setShowOptionButton(false)}>
            <div className="task-column space-between">
                <h2 className='alt-text'>{status} ({countTasksByStatus(status)})</h2>

                {showOptionButton === true  && <button
                    onClick={handleOptionsClick}
                    className="btn btn-icon">
                    <FontAwesomeIcon className="alt-text"
                        icon={faEllipsisVertical}
                        width={16}
                        height={16} />
                </button>}
            </div>

            {showingStatusActions &&
                <div ref={statusActionsRef}>
                    <StatusActions boardId={selectedBoard!._id} status={status} onCloseDropdown={onCloseDropdown} />
                </div>
            }

            {renderTasksByStatus(status)}
        </div>
    )
}
