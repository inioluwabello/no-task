'use client'

import { getBoardsAsync, selectBoards, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { LeftPane } from "../LeftPane/LeftPane";
import React, { useEffect } from "react";
import { useContext } from 'react';
import { TaskList } from "../Task/TaskList";
import { TopPane } from "./TopPane";

const Board = React.memo(() => {

    const theme = useSelector(selectTheme);
    const dispatch = useDispatch()
    const boardList = useSelector(selectBoards);
    useEffect(() => {
        if (!boardList || boardList.length === 0)
            dispatch(getBoardsAsync());
    })

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