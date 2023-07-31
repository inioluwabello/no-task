import { getSelectedBoard, modalSlice, useDispatch, useSelector } from "@/lib/redux"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./toppane.module.css"
import { useState } from "react"
export const TopPane = () => {

    const selectedBoard = useSelector(getSelectedBoard)
    const [showTopBarOptions, setShowTopBarOptions] = useState(false)

    const dispatch = useDispatch();

    return (
        <div className={`pane ${styles.topPane} space-between`}>
            <h3 className={styles.paneTitle}>{selectedBoard ? selectedBoard.title : `No Board Selected`}</h3>
            <div className="top-bar-actions">
                <div className="flex ac">
                    <button className="btn btn-rnd pry-bg mr-1"
                        onClick={() => dispatch(modalSlice.actions.setState(true))}
                    >+ Add New Task</button>
                    <button className="btn btn-icon"
                        onClick={() => setShowTopBarOptions(!showTopBarOptions)}>
                        <FontAwesomeIcon className="alt-text" 
                            icon={faEllipsisVertical} 
                            width={16} 
                            height={16} />
                    </button>
                </div>

                {showTopBarOptions === true && <div className="relative">
                    <div className="top-bar-actions">
                        <ul>
                            <li className="pointer">Archived Items</li>
                        </ul>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}