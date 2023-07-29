'use client'

import { getBoardsAsync, pageSlice, selectBoards, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { LeftPane } from "../LeftPane/LeftPane";
import React, { useEffect } from "react";
import { TaskList } from "../Task/TaskList";
import { TopPane } from "../TopPane/TopPane";

const Board = React.memo(() => {

    const dispatch = useDispatch()
    const theme = useSelector(selectTheme);
    const boardList = useSelector(selectBoards);
    
    useEffect(() => {
        // Dispatch getBoardsAsync only if boardList is empty
        if (!boardList || boardList.length === 0) {
            dispatch(getBoardsAsync());
        }
    }, [dispatch, boardList]);

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
        </div>

    )
});

export default Board;