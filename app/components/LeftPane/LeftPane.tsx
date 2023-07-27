import { BoardList } from "../Board/BoardList"
import { Logo } from "../Logo"

export const LeftPane = () => {
    return (
        <div className="left-pane">
            <Logo />
            <BoardList />
        </div>
    )
}