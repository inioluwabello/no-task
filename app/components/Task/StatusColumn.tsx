import { IBoard, ITask } from "@/lib/interfaces";
import { TaskCard } from "./TaskCard";
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { StatusActions } from "./StatusActions";
import { updateTaskByStatusAsync, updateTaskStatusAsync, useDispatch } from "@/lib/redux";
import { generateColor } from "@/app/utils/util";
import { NewInlineTask } from "./NewInlineTask";

export const StatusColumn = ({ 
        status, tasks, selectedBoard, statusArray 
    }: {
        status: string, tasks: ITask[], selectedBoard?: IBoard, statusArray: string[] 
    }) => {
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

    const countTasksByStatus = (status: string) => {
        return (tasks.filter((task) => task.status === status)).length;
    };

    const handleOptionsClick = () => {
        setShowingStatusActions(!showingStatusActions);
    };

    const onCloseDropdown = () => {
        setShowingStatusActions(false);
    }

    const renderTasksByStatus = (status: string) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard key={task._id} task={task} />
            ));
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        e.preventDefault();
    }

    const dispatch = useDispatch();
    const onDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {   
        const task: ITask = JSON.parse(e.dataTransfer.getData('task'));
        if (task.status !== status) {
            dispatch(updateTaskStatusAsync({ taskId: task._id!, status }))
        }
    }

    const [showOptionButton, setShowOptionButton] = useState(false)
    const [statusEditorVisible, setStatusEditorVisible] = useState(false)
    const statusRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // Focus the input element when newClEditorVisible is set to true
        if (statusEditorVisible && statusRef.current) {
            statusRef.current.focus();
        }
    }, [statusEditorVisible]);

    const handleEditColumnClick = () => {
        setStatusEditorVisible(true);
        setNewStatusName(status === 'NEW STATUS' ?  '' : status);
    }
    const [newStatusName, setNewStatusName] = useState('');
    const handleStatusInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewStatusName(e.target.value)
    }
    const [entryError, setEntryError] = useState(false);
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && newStatusName !== '') {
            if (statusArray.indexOf(newStatusName.toLocaleUpperCase()) === -1){
                const payload = { 
                    boardId: selectedBoard!._id, 
                    oldStatus: status, 
                    newStatus: newStatusName.toLocaleUpperCase() 
                }
                dispatch(updateTaskByStatusAsync(payload))
                setStatusEditorVisible(false);
                setEntryError(false)
            }
            else
                setEntryError(true);
        }

    }
    
    return (
        <div className="column" 
            onDragOver={(e) => onDragOver(e, status)}
            onDrop={(e) => onDrop(e, status)}
            onMouseEnter={() => setShowOptionButton(true)}
            onMouseLeave={() => setShowOptionButton(false)}>
            <div className="task-column space-between">
                {statusEditorVisible === false && 
                    <h2 className='alt-text' onClick={handleEditColumnClick}>
                    <span className="status-icon" style={{ background: generateColor() }}></span> 
                    {status} ({countTasksByStatus(status)})</h2>}

                {
                    statusEditorVisible === false &&
                    showOptionButton === true  && 
                    <button
                        onClick={handleOptionsClick}
                        className="btn btn-icon">
                        <FontAwesomeIcon className="alt-text"
                            icon={faEllipsisVertical}
                            width={16}
                            height={16} />
                    </button>
                }


                {/* Input Editor */}
                {statusEditorVisible && <input type="text"
                    onChange={handleStatusInput}
                    onKeyDown={handleEnterPress}
                    value={newStatusName}
                    placeholder="Press enter to save"
                    className={`
                            ${statusEditorVisible === true ? '' : 'd-none'} 
                            ${entryError === true ? 'error' : ''}
                            alt-text inline-editor`}
                    ref={statusRef} />}
            </div>

            {showingStatusActions &&
                <div ref={statusActionsRef}>
                    <StatusActions boardId={selectedBoard!._id} status={status} onCloseDropdown={onCloseDropdown} />
                </div>
            }

            {renderTasksByStatus(status)}

            <NewInlineTask 
                isVisible={showOptionButton} 
                status={status}
                selectedBoard={selectedBoard} />
        </div>
    )
}
