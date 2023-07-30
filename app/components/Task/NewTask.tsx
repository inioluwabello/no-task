import { IBoard } from "@/lib/interfaces";
import { createNewTaskAsync, useDispatch } from "@/lib/redux";
import { faEllipsisVertical, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface NewTaskProp {
    selectedBoard?: IBoard,
    statusArray: string[]
}

export const NewTask = ({ selectedBoard, statusArray }: NewTaskProp) => {

    const dispatch = useDispatch();
    const statusRef = useRef<HTMLInputElement>(null);

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

    const [entryError, setEntryError] = useState(false);
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && newStatusName !== '') {
            if (statusArray.indexOf(newStatusName.toLocaleUpperCase()) === -1)
                setNewClEditorVisible(false);
            else
                setEntryError(true);
        }

    }

    const [newTaskTitle, setNewTask] = useState('');
    const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTask(e.target.value)
    }

    const handleNewTaskEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Dispatch the new task addition
            if (newTaskTitle !== '') {
                try {
                    const payload = {
                        boardId: selectedBoard?._id ?? '',
                        title: newTaskTitle,
                        status: newStatusName.toLocaleUpperCase(),
                    };

                    await dispatch(createNewTaskAsync(payload));
                    setNewTask('');
                    setNewStatusName('')
                    setNewClEditorVisible(false);
                    setEntryError(false)
                } catch (error) {
                    console.error('Error creating a new task:', error);
                    // Handle error state if needed
                }
            }
        }
    };

    return (
        <>
            {selectedBoard && <div className="column new-column">
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
                    placeholder="Press enter to save"
                    className={`
                            ${newClEditorVisible === true ? '' : 'd-none'} 
                            ${entryError === true ? 'error' : ''}
                            alt-text inline-editor`}
                    ref={statusRef} />

                
                {newStatusName !== '' && newClEditorVisible === false &&
                    <div className="add-task">
                        <input type="text"
                            className="new-task"
                            onChange={handleNewTaskInput}
                            onKeyDown={handleNewTaskEnterPress}
                            value={newTaskTitle}
                            placeholder='Add new task' />

                    </div>
                }
            </div>}

            {!selectedBoard && 
                <div className="default-board-message text-center">
                    Create or select a board

                    <div className="default-icon">
                        <FontAwesomeIcon icon={faProjectDiagram} style={{width: "250px", height: "250px"}} />
                    </div>

                </div>}
        </>
    )
}