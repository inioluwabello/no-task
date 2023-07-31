'use client'

import { getBoardsAsync, getSelectedBoard, pageSlice, selectBoards, selectModalState, selectTasks, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { LeftPane } from "../LeftPane/LeftPane";
import React, { useEffect, useState } from "react";
import { TaskList } from "../Task/TaskList";
import { TopPane } from "../TopPane/TopPane";
import { NewTaskModal } from "../Modal/NewTaskModal";
import { ITask } from "@/lib/interfaces";

const Board = React.memo(() => {

    const dispatch = useDispatch()
    const theme = useSelector(selectTheme);
    const boardList = useSelector(selectBoards); 
    const [isFetching, setIsFetching] = useState(false);
    const [hasFetched, setHasFetched] = useState(false); // Track if the API call has been attempted

    const tasks = useSelector(selectTasks);
    const statusOptions = [...new Set(tasks.map((task: ITask) => task.status))];
    const selectedBoard = useSelector(getSelectedBoard);
    const modalIsOpen = useSelector(selectModalState)
    
    useEffect(() => {
        // Dispatch getBoardsAsync only if boardList is empty and not already fetching
        if (!hasFetched && (!boardList || boardList.length === 0)) {
            if (!isFetching) {
                setIsFetching(true);
                dispatch(getBoardsAsync())
                    .then(() => {
                        setHasFetched(true); // Mark that the API call has been attempted
                    })
                    .catch((error) => {
                        // Handle error, e.g., display an error message or log the error
                        console.error("Error fetching boards:", error);
                    })
                    .finally(() => {
                        setIsFetching(false);
                    });
            }
        }
    }, [dispatch, boardList, isFetching]);

    useEffect(() => {
        // On page load, check if there's a saved theme in localStorage
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            dispatch(pageSlice.actions.setTheme(savedTheme));
        }
    }, [dispatch]);

    return (
        <div className={`main ${theme} flex`}>
            <LeftPane />

            <div className="right-pane">
                <TopPane />
                <div className="tasks">
                    <TaskList />
                </div>
            </div>

            {
                modalIsOpen &&
                statusOptions && 
                statusOptions.length > 0 &&
                selectedBoard &&
                <NewTaskModal statusOptions={statusOptions} boardId={selectedBoard!._id} />
            }
        </div>

    )
});

export default Board;