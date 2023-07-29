import { archiveTaskInStatusAsync, deleteTaskInStatusAsync, useDispatch } from "@/lib/redux"

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
            <div className="status-options">
                <ul>
                    <li className="pointer" onClick={() => archiveTaskInStatus(status)}>Archive</li>
                    <li className="pointer" onClick={() => deleteTaskInStatus(status)}>Delete</li>
                </ul>
            </div>
        </div>
    )
}