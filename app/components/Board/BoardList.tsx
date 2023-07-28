import { selectBoards, useSelector } from "@/lib/redux"
import Link from "next/link"

export const BoardList = () => {
    const boardList = useSelector(selectBoards);

    return (
        <>
            <div className="nav-title">
                ALL BOARDS ({boardList.length})
            </div>
            
            {boardList && <ul className="board-list">
                {boardList.map(item => {
                    return (
                        <li key={item._id}>
                            <Link href={`/board/${item._id}`}>{item.title}</Link>
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