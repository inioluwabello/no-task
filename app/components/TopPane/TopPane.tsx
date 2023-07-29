import { getSelectedBoard, useSelector } from "@/lib/redux"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./toppane.module.css"
export const TopPane = () => {

    const selectedBoard = useSelector(getSelectedBoard)

    return (
        <div className={`pane ${styles.topPane} space-between`}>
            <h3 className={styles.paneTitle}>{selectedBoard ? selectedBoard.title : `Default Board`}</h3>
            <div className="top-bar-actions">
                <div className="flex ac">
                    <button className="btn btn-rnd pry-bg mr-1">+ Add New Task</button>
                    <button className="btn btn-icon">
                        <FontAwesomeIcon className="alt-text" 
                            icon={faEllipsisVertical} 
                            width={16} 
                            height={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}