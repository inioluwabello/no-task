import { IBoard } from "@/lib/interfaces";
import { boardSlice, createNewBoardAsync, getBoardTasksAsync, getSelectedBoard, selectBoards, useDispatch, useSelector } from "@/lib/redux"
import { useEffect, useRef, useState } from "react";
import { BoardListItem } from "./BoardListItem";

export const BoardList = () => {
    const boardList = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)
    const dispatch = useDispatch();


    useEffect(() => {
        if (!selectedBoard)
            return;
            
        dispatch(getBoardTasksAsync(selectedBoard!._id))
    }, [selectedBoard])

    const newBoardRef = useRef < HTMLInputElement >(null)
    const [newBoardEditorVisible, setNewEditorVisibility] = useState(false);

    useEffect(() => {
        // Focus the input element when newBoardEditorVisible is set to true
        if (newBoardEditorVisible && newBoardRef.current) {
            newBoardRef.current.focus();
        }
    }, [newBoardEditorVisible]);

    const [newBoardName, setNewBoardName] = useState('')
    const handleBoardNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBoardName(e.target.value)
    }

    const handleBoardEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (newBoardName.trim() !== '' && e.key === 'Enter') {
            const payload = {
                title: newBoardName
            }
            dispatch(createNewBoardAsync(payload))
            setNewBoardName('')
            setNewEditorVisibility(false)
        }
    }

    return (
        <>
            <div className="nav-title">
                ALL BOARDS ({boardList.length})
            </div>
            
            {boardList && <ul className="board-list">
                {boardList.map(item => {
                    return (
                        <BoardListItem key={item._id} selectedBoard={selectedBoard} item={item} />
                    )
                })}
                <li className="new-board">
                    {!newBoardEditorVisible && 
                        <button
                            onClick={() => {
                                setNewEditorVisibility(!newBoardEditorVisible);
                                newBoardRef.current?.focus();
                            }}
                            className="alt-pry-text pointer">+ Create New Board</button>}
                    {newBoardEditorVisible &&
                        <input
                            ref={newBoardRef}
                            value={newBoardName}
                            onChange={handleBoardNameInput}
                            onKeyDown={handleBoardEnterPress}
                            placeholder="Press Enter to save"
                            className="inline-editor alt-text" type="text" />}
                </li>
            </ul>}
        </>
    )
}