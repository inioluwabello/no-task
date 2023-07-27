import { getSelectedBoard, useSelector } from "@/lib/redux"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const TopPane = () => {

    const selectedBoard = useSelector(getSelectedBoard)

    return (
        <div className="top-pane space-between">
            <h1 className="title">{selectedBoard?.title}</h1>
            <div className="top-bar-actions">
                <div className="flex">
                    <button className="btn btn-rnd pry-bg">+ Add New Task</button>
                    <FontAwesomeIcon icon={faEllipsisVertical} width={16} height={16} />
                </div>
            </div>
        </div>
    )
}