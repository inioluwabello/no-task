'use client'

import { getBoardsAsync, selectBoards, useDispatch, useSelector } from "@/lib/redux";
import { LeftPane } from "../LeftPane/LeftPane";
import { TaskList } from "../Task/TaskList";
import { TopPane } from "./TopPane";
import { useEffect } from "react";
import React from "react";

const Board = React.memo(() => {

    const dispatch = useDispatch()
    const boardList = useSelector(selectBoards);
    useEffect(() => {
        if (!boardList || boardList.length === 0)
            dispatch(getBoardsAsync());
    })

    return (
        <div className="content flex">
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