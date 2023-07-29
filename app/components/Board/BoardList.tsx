import { IBoard, boardSlice, getBoardTasksAsync, getSelectedBoard, selectBoards, useDispatch, useSelector } from "@/lib/redux"
import Link from "next/link"
import { useEffect } from "react";

export const BoardList = () => {
    const boardList = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)
    const dispatch = useDispatch();

    const handleSelectBoardClick = (item: IBoard): void => {
        dispatch(boardSlice.actions.selectBoard(item))
    }

    useEffect(() => {
        if (!selectedBoard)
            return;
            
        dispatch(getBoardTasksAsync(selectedBoard!._id))
    }, [selectedBoard])

    return (
        <>
            <div className="nav-title">
                ALL BOARDS ({boardList.length})
            </div>
            
            {boardList && <ul className="board-list">
                {boardList.map(item => {
                    return (
                        <li 
                            key={item._id} 
                            className={`${selectedBoard?._id === item._id ? 'selected-board' : ''} pointer`}
                            onClick={() => handleSelectBoardClick(item)}>
                            <span>{item.title}</span>
                        </li>
                    )
                })}
                <li className="new-board">
                    <Link href={`/board/new-board`}>+ Create New Board</Link>
                </li>
            </ul>}
        </>
    )
}