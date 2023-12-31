import { IBoard } from "@/lib/interfaces";
import { boardSlice, deleteBoardAsync, getBoardTasksAsync, selectBoards, useDispatch, useSelector } from "@/lib/redux";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const BoardListItem = ({ selectedBoard, item }: {selectedBoard?: IBoard, item: IBoard}) => {

    const dispatch = useDispatch();
    const boardList = useSelector(selectBoards);
    const [closeVisible, setCloseVisiblity] = useState(false)
    const handleSelectBoardClick = (item: IBoard): void => {
        dispatch(boardSlice.actions.selectBoard(item))
    }

    const handleDeleteClick = (boardId: string) => {
        // TODO: Add Modal
        if (selectedBoard && selectedBoard._id === boardId) {
            // If the deleted board is the selected board, dispatch the resetBoard action
            dispatch(boardSlice.actions.resetBoard());
        }

        dispatch(deleteBoardAsync(boardId))
    }

    return (
        <li
            className={`${selectedBoard?._id === item._id ? 'selected-board' : ''} board-li pointer space-between`}
            onMouseEnter={() => setCloseVisiblity(true)}
            onMouseLeave={() => setCloseVisiblity(false)}
            onClick={() => handleSelectBoardClick(item)}>
            <span>
                <FontAwesomeIcon icon={faBriefcase} />{" "}
                {item.title}</span>

            {closeVisible &&
                <button 
                    className="pointer inline-btn pry-text" 
                    onClick={() => handleDeleteClick(item._id)}
                    style={{ marginRight: ".5em" }}>
                    <img src="/images/icon-cross.svg" width={10} height={10} alt="close" />
                </button>
            }
        </li>
    )
}