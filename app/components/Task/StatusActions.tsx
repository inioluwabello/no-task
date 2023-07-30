import { archiveTaskInStatusAsync, deleteTaskInStatusAsync, useDispatch } from "@/lib/redux"
import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StatusActions = ({ boardId, status, onCloseDropdown }: { boardId: string, status: string, onCloseDropdown: () => void }) => {
    
    const dispatch = useDispatch();
    const deleteTaskInStatus = async (status: string) => {
        const payload = {
            boardId: boardId,
            status: status,
        };

        onCloseDropdown()
        await dispatch(deleteTaskInStatusAsync(payload));
    }

    const archiveTaskInStatus = async (status: string) => {
        const payload = {
            boardId: boardId,
            status: status,
        };

        onCloseDropdown()
        await dispatch(archiveTaskInStatusAsync(payload));
    }

    return (

        <div className="relative">
            <div className="status-options alt-text">
                <ul>
                    <li className="pointer" onClick={() => archiveTaskInStatus(status)}>
                        <FontAwesomeIcon icon={faArchive} /> Archive
                    </li>
                    <li className="pointer" onClick={() => deleteTaskInStatus(status)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </li>
                </ul>
            </div>
        </div>
    )
}